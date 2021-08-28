import * as Comlink from "comlink";
import worker from "./worker.ts?worker";

type builder = (top: ArrayBuffer, bottom: ArrayBuffer) => Promise<string>;

const buildImage = Comlink.wrap(new worker()) as unknown as builder;
export default buildImage;
