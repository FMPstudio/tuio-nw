export type DecodedString = {
  value: string;
  data: Buffer;
};

export type DecodedTime = {
  value: number;
  data: Buffer;
};

export type DecodedNumber = {
  value: number;
  data: Buffer;
};

export enum DecodeTypeTag {
  INT = "i",
  FLOAT = "f",
  STRING = "s",
}
