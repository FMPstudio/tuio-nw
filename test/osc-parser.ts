import "mocha";
import { expect } from "chai";

describe("Stub test", () => {
  it("Should be true", () => {
    expect(true).to.eql(Boolean(1));
  });
});
