// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ProtocolPublish extends ethereum.Event {
  get params(): ProtocolPublish__Params {
    return new ProtocolPublish__Params(this);
  }
}

export class ProtocolPublish__Params {
  _event: ProtocolPublish;

  constructor(event: ProtocolPublish) {
    this._event = event;
  }

  get name(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get version(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get tags(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get url(): string {
    return this._event.parameters[3].value.toString();
  }

  get owner(): Address {
    return this._event.parameters[4].value.toAddress();
  }
}

export class CannonRegistry extends ethereum.SmartContract {
  static bind(address: Address): CannonRegistry {
    return new CannonRegistry("CannonRegistry", address);
  }
}
