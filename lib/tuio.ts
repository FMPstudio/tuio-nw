class Tuio {
  private _eventSplitter = /\s+/;

  public VERSION = "1.0.2";
}

type ClientParams = {
  port: number;
  host: string;
};

class Client {
  _port: number = 3333;
  _host: string = "127.0.0.1";

  _socket: any = null;
  _oscParser: any = null;

  public initialize(params: ClientParams) {
    const { port, host } = params;
    this._port = port;
    this._host = host;
  }
}

export { Tuio };
