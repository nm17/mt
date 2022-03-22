import {Readable} from 'stream';
import {TLObject} from '../TLObject';
import {tl} from '../';

/**
 * Constructor of:
 * req_pq_multi#be7e8ef1
 * nonce:int128
 * = ResPQ;
 */
export class ReqPqMulti extends TLObject {
  static id: string = 'be7e8ef1';
  id: string = ReqPqMulti.id;
  isFunction: boolean = true;

  /**
   * ReqPqMulti constructor.
   *
   * @param {Object} values
   * Constructor values.
   *
   * @param {tl.primitives.TLInt128} values.nonce
   * Client nonce.
   */
  constructor({nonce}: { nonce: tl.primitives.TLInt128 }) {
    super(true);

    this.values.set('nonce', nonce);
  }

  /**
   * ReqPqMulti creator. Used for constructor mapping.
   *
   * @param {Readable} data
   * Type Language Readable stream.
   *
   * @return {ReqPqMulti}
   * Constructed Type Language Object.
   */
  static create(data: Readable): ReqPqMulti {
    return new ReqPqMulti({nonce: tl.primitives.TLInt128.create(data)});
  }

  /**
   * ReqPqMulti serializer.
   *
   * @return {Buffer}
   * Serialized Type Language Object.
   */
  serialize(): Buffer {
    return Buffer.concat([
      Buffer.from(ReqPqMulti.id, 'hex').reverse(),
      this.values.get('nonce')!.serialize(),
    ]);
  }
}
