import {Readable} from 'stream';
import {TLObject} from '../TLObject';
import {tl} from '../';

/**
 * Constructor of:
 * resPQ#05162463
 * nonce:int128
 * server_nonce:int128
 * pq:string
 * server_public_key_fingerprints:Vector long
 * = ResPQ;
 */
export class ResPq extends TLObject {
  static id: string = '05162463';
  id: string = ResPq.id;
  isFunction: boolean = false;

  /**
   * ResPq constructor.
   *
   * @param {Object} values
   * Constructor values.
   *
   * @param {tl.primitives.TLInt128} values.nonce
   * Client nonce.
   *
   * @param {tl.primitives.TLInt128} values.serverNonce
   * Server nonce.
   */
  constructor({
    nonce,
    serverNonce,
  }: {
        nonce: tl.primitives.TLInt128,
        serverNonce: tl.primitives.TLInt128
    }) {
    super(true);

    this.values.set('nonce', nonce);
    this.values.set('serverNonce', serverNonce);
  }

  /**
   * ResPq creator. Used for constructor mapping.
   *
   * @param {Readable} data
   * Type Language Readable stream.
   *
   * @return {ResPq}
   * Constructed Type Language Object.
   */
  static create(data: Readable): ResPq {
    return new ResPq({
      nonce: tl.primitives.TLInt128.create(data),
      serverNonce: tl.primitives.TLInt128.create(data),
    });
  }

  /**
   * ResPq serializer.
   *
   * @return {Buffer}
   * Serialized Type Language Object.
   */
  serialize(): Buffer {
    return Buffer.concat([
      Buffer.from(ResPq.id, 'hex').reverse(),
      this.values.get('nonce')!.serialize(),
      this.values.get('serverNonce')!.serialize(),
    ]);
  }
}
