// import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
