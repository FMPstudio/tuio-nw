import jspack from "jspack";
import dgram from "dgram";

type DecodedString = {
  value: string;
  data: Buffer;
};

type DecodedTime = {
  value: number;
  data: Buffer;
};

type DecodedInt = {
  value: string;
  data: Buffer;
};

class OscParser {
  decodeInt(data: Buffer): DecodedInt {
    return {
      value: jspack.Unpack(">i", data.slice(0, 4))[0],
      data: data.slice(4),
    };
  }

  decodeFloat(data: Buffer) {
    // return {
    //   value: jspack.Unpack(">f", data.slice(0, 4))[0],
    //   data: data.slice(4),
    // };
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
    const time = jspack.Unpack(">LL", data.slice(0, 8)),
      seconds = time[0],
      fraction = time[1];
    return {
      value: seconds + fraction / 4294967296,
      data: data.slice(8),
    };
  }

  decodeBundle(data: Buffer, message: any[]) {
    const time = this.decodeTime(data);
    let bundleSize;
    let content;
    data = time.data;
    message.push("#bundle");
    message.push(time.value);
    while (data.length > 0) {
      bundleSize = this.decodeInt(data);
      data = bundleSize.data;
      content = data.slice(0, bundleSize.value);
      message.push(decode(content));
      data = data.slice(bundleSize.value, data.length);
    }
    return data;
  }

  decodeByTypeTag(typeTag, data: Buffer) {
    // switch (typeTag) {
    //   case "i":
    //     return this.decodeInt(data);
    //   case "f":
    //     return this.decodeFloat(data);
    //   case "s":
    //     return this.decodeString(data);
    // }
  }

  decodeMessage(address, data: Buffer, message) {
    // message.push(address.value);
    // let typeTags = this.decodeString(data).value;
    // data = typeTags.data;
    // if (typeTags[0] === ",") {
    //   for (var i = 1; i < typeTags.length; i++) {
    //     const arg = this.decodeByTypeTag(typeTags[i], data);
    //     data = arg.data;
    //     message.push(arg.value);
    //   }
    // }
    // return data;
  }

  decode(data: Buffer) {
    const message = [];
    const address = this.decodeString(data);
    // data = address.data;
    if (address.value === "#bundle") {
      data = this.decodeBundle(data, message);
      // } else if (data.length > 0) {
      //   data = this.decodeMessage(address, data, message);
    }
    // return message;
  }
}

export { OscParser };
