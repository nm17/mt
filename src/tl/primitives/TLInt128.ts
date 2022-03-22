import {Readable} from 'stream';
import {TLObject} from '../TLObject';
import * as BigIntExt from 'bigint-buffer';

/**
 * Constructor class of:
 * int128
 */
export class TLInt128 extends TLObject {
  value: bigint;

  /**
   * Constructor of TLInt128.
   *
   * @param {bigint} value
   * TLInt128 value.
   */
  constructor(value: bigint) {
    super(true);

    this.value = value;
  }

  /**
   * Creator of TLInt128. Used for constructor mapping.
   *
   * @param {Readable} data
   * Valid TLInt128 Readable stream.
   *
   * @return {ReqPqMulti}
   * Constructed TLInt128 Object.
   */
  static create(data: Readable): TLInt128 {
    return new TLInt128(
        BigInt.asIntN(128, BigIntExt.toBigIntLE(data.read(16))),
    );
  }

  /**
   * Serializer of TLInt128.
   *
   * @return {Buffer}
   * Serialized TLInt128 Object.
   */
  serialize(): Buffer {
    return BigIntExt.toBufferLE(BigInt.asUintN(128, this.value), 16);
  }
}
