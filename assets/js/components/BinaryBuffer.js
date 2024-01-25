export default class BinaryBuffer {
  constructor(maxSize = 64) {
    this.data = new DataView(new ArrayBuffer(0, { maxByteLength: maxSize }));
    this.sections = {};
  }

  get size() {
    return this.data.buffer.byteLength;
  }

  get buffer() {
    return this.data.buffer;
  }

  create(name, type) {
    this.sections[name] = new type(name, this.size, this);
  }
}

class BinarySection {
  constructor(name, offset, buffer, size) {
    this.name = name;
    this.offset = offset;
    this.buffer = buffer;
    this.endian = BinarySection.endianType.little;

    this.buffer.resize(this.buffer.size + size);

    Object.defineProperty(buffer, name, { value: this });
  }
  static size = 0;
  static endianType = { big: false, little: true };
}

export class Byte extends BinarySection {
  constructor(name, offset, buffer) {
    super(name, offset, buffer, Byte.size);
  }

  get unsigned() {
    return this.buffer.data.getUint8(this.offset);
  }

  get signed() {
    return this.buffer.data.getInt8(this.offset);
  }

  set unsigned(value) {
    this.buffer.data.setUint8(this.offset, value);
  }

  set signed(value) {
    this.buffer.data.setInt8(this.offset, value);
  }

  static size = 1;
}

export class Short extends BinarySection {
  constructor(name, offset, buffer) {
    super(name, offset, buffer, Short.size);
  }

  get unsigned() {
    return this.buffer.data.getUint16(this.offset, this.endian);
  }

  get signed() {
    return this.buffer.data.getInt16(this.offset, this.endian);
  }

  set unsigned(value) {
    this.buffer.data.setUint16(this.offset, value, this.endian);
  }

  set signed(value) {
    this.buffer.data.setInt16(this.offset, value, this.endian);
  }

  static size = 2;
}

export class Int extends BinarySection {
  constructor(name, offset, buffer) {
    super(name, offset, buffer, Int.size);
  }

  get unsigned() {
    return this.buffer.data.getUint32(this.offset, this.endian);
  }

  get signed() {
    return this.buffer.data.getInt32(this.offset, this.endian);
  }

  set unsigned(value) {
    this.buffer.data.setUint32(this.offset, value, this.endian);
  }

  set signed(value) {
    this.buffer.data.setInt32(this.offset, value, this.endian);
  }

  static size = 4;
}

export class Long extends BinarySection {
  constructor(name, offset, buffer) {
    super(name, offset, buffer, Long.size);
  }

  get unsigned() {
    return this.buffer.data.getBigUint64(this.offset, this.endian);
  }

  get signed() {
    return this.buffer.data.getBigInt64(this.offset, this.endian);
  }

  set unsigned(value) {
    this.buffer.data.setBigUint64(this.offset, BigInt(value), this.endian);
  }

  set signed(value) {
    this.buffer.data.setBigInt64(this.offset, BigInt(value), this.endian);
  }
  static size = 8;
}
