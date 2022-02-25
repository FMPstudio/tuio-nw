import "mocha";
import { expect } from "chai";

import { OscParser } from "../lib/OscParser";
import * as oscParser from "../lib/osc-parser.js";

describe("OscParser", () => {
  it("Original OSC message #1 should be decoded", () => {
    const hexValues1 = [
      0x2f, 0x74, 0x75, 0x69, 0x6f, 0x2f, 0x32, 0x44, 0x63, 0x75, 0x72, 0x00,
      0x2c, 0x73, 0x69, 0x00, 0x66, 0x73, 0x65, 0x71, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x2f, 0x4d, 0x29,
    ];
    const oscMessageBuffer = Buffer.from(hexValues1);
    // Old way: using jspack
    let jspack_decodeMessage = oscParser.decode(oscMessageBuffer);
    // New way: Node only
    const parser = new OscParser();
    const node_decodedMessage = parser.decode(oscMessageBuffer);
    expect(jspack_decodeMessage).to.eql(node_decodedMessage);
  });

  it("Original OSC message #2 should be decoded", () => {
    const hexValues2 = [
      0x2f, 0x74, 0x75, 0x69, 0x6f, 0x2f, 0x32, 0x44, 0x63, 0x75, 0x72, 0x00,
      0x2c, 0x73, 0x00, 0x00, 0x61, 0x6c, 0x69, 0x76, 0x65, 0x00, 0x00, 0x00,
    ];
    const oscMessageBuffer = Buffer.from(hexValues2);
    // Old way: using jspack
    let jspack_decodeMessage = oscParser.decode(oscMessageBuffer);
    // console.log("jsdecode/Message: ", jspack_decodeMessage);
    // New way: Node only
    const parser = new OscParser();
    const node_decodedMessage = parser.decode(oscMessageBuffer);
    // console.log("node/Message: ", jspack_decodeMessage);
    expect(jspack_decodeMessage).to.eql(node_decodedMessage);
  });

  it("Original OSC message #3 should be decoded", () => {
    const hexValues3 = [
      0x23, 0x62, 0x75, 0x6e, 0x64, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x18, 0x2f, 0x74, 0x75, 0x69,
      0x6f, 0x2f, 0x32, 0x44, 0x63, 0x75, 0x72, 0x00, 0x2c, 0x73, 0x00, 0x00,
      0x61, 0x6c, 0x69, 0x76, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c,
      0x2f, 0x74, 0x75, 0x69, 0x6f, 0x2f, 0x32, 0x44, 0x63, 0x75, 0x72, 0x00,
      0x2c, 0x73, 0x69, 0x00, 0x66, 0x73, 0x65, 0x71, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x30, 0x18, 0xb8,
    ];
    const oscMessageBuffer = Buffer.from(hexValues3);
    // Old way: using jspack
    let jspack_decodeMessage = oscParser.decode(oscMessageBuffer);
    // console.log("jsdecode/Message: ", jspack_decodeMessage);
    // New way: Node only
    const parser = new OscParser();
    const node_decodedMessage = parser.decode(oscMessageBuffer);
    // console.log("node/Message: ", jspack_decodeMessage);
    expect(jspack_decodeMessage).to.eql(node_decodedMessage);
  });
});
