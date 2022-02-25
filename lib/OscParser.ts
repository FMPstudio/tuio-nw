import {
  DecodedNumber,
  DecodedString,
  DecodeTypeTag,
  DecodedTime,
} from "./types";

class OscParser {
  decodeInt(data: Buffer): DecodedNumber {
    return {
      value: data.readUintBE(0, 4),
      data: data.slice(4),
    };
  }

  decodeFloat(data: Buffer): DecodedNumber {
    return {
      value: data.readFloatBE(),
      data: data.slice(4),
    };
  }

  decodeString(data: Buffer): DecodedString {
    let end = 0;
    while (data[end] && end < data.length) {
      end++;
    }
    return {
      value: data.toString("ascii", 0, end),
      data: data.slice(Math.ceil((end + 1) / 4) * 4),
    };
  }

  decodeTime(data: Buffer): DecodedTime {
    const seconds = data.readUIntBE(0, 4);
    const fraction = data.readUIntBE(4, 4);
    return {
      value: seconds + fraction / 4294967296,
      data: data.slice(8),
    };
  }

  decodeBundle(data: Buffer, message: any[]): Buffer {
    const { value: timeValue, data: timeData } = this.decodeTime(data);
    let bundleSize;
    let content;
    data = timeData;
    message.push("#bundle");
    message.push(timeValue);
    while (data.length > 0) {
      bundleSize = this.decodeInt(data);
      data = bundleSize.data;
      content = data.slice(0, bundleSize.value);
      message.push(this.decode(content));
      data = data.slice(bundleSize.value, data.length);
    }
    return data;
  }

  decodeByTypeTag(typeTag: DecodeTypeTag, data: Buffer) {
    switch (typeTag) {
      case DecodeTypeTag.INT:
        return this.decodeInt(data);
      case DecodeTypeTag.FLOAT:
        return this.decodeFloat(data);
      case DecodeTypeTag.STRING:
        return this.decodeString(data);
    }
  }

  decodeMessage(address: DecodedString, data: Buffer, message: any[]) {
    message.push(address.value);
    const { value: typeTags, data: resultData } = this.decodeString(data);
    data = resultData;
    if (typeTags[0] === ",") {
      for (var i = 1; i < typeTags.length; i++) {
        const tag: DecodeTypeTag = typeTags.charAt(i) as DecodeTypeTag;
        const arg = this.decodeByTypeTag(tag, data);
        data = arg.data;
        message.push(arg.value);
      }
    }
    return data;
  }

  decode(data: Buffer) {
    const message: any[] = [];
    const address = this.decodeString(data);
    data = address.data;
    if (address.value === "#bundle") {
      this.decodeBundle(address.data, message);
    } else if (data.length > 0) {
      data = this.decodeMessage(address, data, message);
    }
    return message;
  }
}

export { OscParser };
