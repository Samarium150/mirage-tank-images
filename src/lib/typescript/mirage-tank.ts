import Jimp from "jimp/browser/lib/Jimp.js";
import JIMP from "jimp/types/index.d.ts";
import ab2b from "arraybuffer-to-buffer";
import * as mjs from "mathjs";

class MirageTankImage {

    readonly width: number;
    readonly height: number;
    private channel: number;
    private data: mjs.Matrix

    constructor(image: JIMP | mjs.Matrix) {
        if (image instanceof Jimp) {
            image = image as JIMP;
            this.width = image.bitmap.width;
            this.height = image.bitmap.height;
            const matrix = mjs.zeros([this.height, this.width, 3], "dense") as mjs.Matrix;
            image.scan(0, 0, image.bitmap.width, image.bitmap.height,
                function (x: number, y: number, index: number) {
                    matrix.set([y, x, 0], this.bitmap.data[index]);
                    matrix.set([y, x, 1], this.bitmap.data[index] + 1);
                    matrix.set([y, x, 2], this.bitmap.data[index] + 2);
                }
            );
            this.data = matrix;
            this.channel = 3;
        } else {
            image = image as mjs.Matrix;
            const size = image.size();
            this.width = size[1];
            this.height = size[0];
            this.channel = size[2];
            this.data = image;
        }
    }

    getData(): mjs.Matrix {
        return this.data;
    }

    desaturate() {
        this.data = mjs.divide(mjs.add(mjs.max(this.data, 2), mjs.min(this.data, 2)), 2) as mjs.Matrix;
        this.channel = 1;
    }

    invert() {
        this.data = mjs.subtract(255, this.data) as mjs.Matrix;
    }

    adjustLightness(ratio: number) {
        if (ratio > 0)
            this.data = mjs.add(mjs.multiply(this.data, 1 - ratio), 255 * ratio) as mjs.Matrix;
        else
            this.data = mjs.multiply(this.data, 1 + ratio);
    }

    linearDodgeBlend(image: MirageTankImage) {
        this.data = mjs.add(this.data, image.getData()) as mjs.Matrix;
    }

    divideBlend(image: MirageTankImage) {
        const result = mjs.zeros([this.height, this.width], "dense") as mjs.Matrix;
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        this.data.forEach((value: number, index: number[]) => {
            const i = mjs.index(...index);
            // @ts-ignore
            const mix = this.data.subset(i) as number;
            // @ts-ignore
            const base = image.getData().subset(i) as number;
            let color: number;
            switch (mix) {
                case 0:
                    color = (base === 0) ? 0 : 255;
                    break;
                case 255:
                    color = base;
                    break;
                case base:
                    color = 255;
                    break;
                default:
                    color = mjs.round((base / mix) * 255);
            }
            result.set([...index], color);
        });
        /* eslint-enable @typescript-eslint/ban-ts-comment */
        this.data = result;
    }

    clone(): MirageTankImage {
        return new MirageTankImage(this.data.clone());
    }

    toRGBA(data?: mjs.Matrix) {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        this.data = this.data.map((value: number, index: number[]) => {
            value = mjs.round(value);
            if (value > 255)
                value = 255;
            if (value < 0)
                value = 0;
            // @ts-ignore
            const alpha = (data) ? data.subset(mjs.index(...index)) as number : 255;
            return [value, value, value, alpha];
        });
        /* eslint-enable @typescript-eslint/ban-ts-comment */
        this.channel = 4;
    }

    toUint8Array(): Uint8Array {
        return new Uint8Array(this.data.toArray().flat(2));
    }

    toUint8ClampedArray(): Uint8ClampedArray {
        return new Uint8ClampedArray(this.data.toArray().flat(2));
    }
}

export async function buildImage(top: ArrayBuffer, bottom: ArrayBuffer): Promise<string> {
    const topImage: JIMP = await Jimp.read(ab2b(top));
    const bottomImage: JIMP = await Jimp.read(ab2b(bottom));
    return new Promise<string>((resolve, reject) => {
        if (topImage.bitmap.width != bottomImage.bitmap.width ||
            topImage.bitmap.height != bottomImage.bitmap.height) reject(new Error("not same size"));
        const top = new MirageTankImage(topImage);
        const bottom = new MirageTankImage(bottomImage);
        top.desaturate();
        bottom.desaturate();
        top.adjustLightness(0.5);
        bottom.adjustLightness(-0.5);
        top.invert();
        top.linearDodgeBlend(bottom);
        const linearDodged = top.clone();
        top.divideBlend(bottom);
        top.toRGBA(linearDodged.getData());
        const result: JIMP = new Jimp({
            data: top.toUint8Array(),
            width: topImage.bitmap.width,
            height: topImage.bitmap.height
        });
        resolve(result.getBase64Async(Jimp.MIME_PNG));
    });
}
