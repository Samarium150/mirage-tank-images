import * as Comlink from "comlink";
// import worker from "./worker.ts?worker";

type builder = (top: ArrayBuffer, bottom: ArrayBuffer) => Promise<string>;

const buildImage = Comlink.wrap(new Worker(new URL("./worker.ts", import.meta.url))) as unknown as builder;
export default buildImage;
