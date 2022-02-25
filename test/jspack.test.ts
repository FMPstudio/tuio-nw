import "mocha";
import { expect } from "chai";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { jspack } from "jspack";

describe("jspack should be unnecessary", () => {
  it("Decode integer", () => {
    const input = 3;
    const jsPack_packResult = jspack.Pack("I", [input]);
    const jsPack_unpackResult = jspack.Unpack("I", jsPack_packResult);
    const decodedBuffer = Buffer.from(jsPack_packResult);
    const node_unpackResult = decodedBuffer.readUintBE(0, 4);
    expect(jsPack_unpackResult[0]).to.eql(node_unpackResult);
  });

  it("Decode time", () => {
    const input = 42;
    const jsPack_packResult = jspack.Pack(
      ">LL",
      `${input}`.split("").map((d) => parseInt(d))
    );
    const jsPack_unpackResult = jspack.Unpack(">LL", jsPack_packResult);
    // console.log("jspack/Unpack", jsPack_unpackResult);
    const decodedBuffer = Buffer.from(jsPack_packResult);
    const node_unpackResult = decodedBuffer.readUIntBE(0, 4);
    const node_unpackResult2 = decodedBuffer.readUIntBE(4, 4);
    // console.log("node/Unpack", node_unpackResult, node_unpackResult2);
    expect(jsPack_unpackResult[0]).to.eql(node_unpackResult);
    expect(jsPack_unpackResult[1]).to.eql(node_unpackResult2);
  });

  it("Decode float", () => {
    const jsPack_packResult = jspack.Pack(">fff", [3, 1, 4]);
    const jsPack_unpackResult = jspack.Unpack(">f", jsPack_packResult);
    // console.log("jspack/Unpack", jsPack_unpackResult);
    const decodedBuffer = Buffer.from(jsPack_packResult);
    const node_unpackResult = decodedBuffer.readFloatBE();
    // console.log("node/Unpack", node_unpackResult);
    expect(jsPack_unpackResult[0]).to.eql(node_unpackResult);
  });
});
