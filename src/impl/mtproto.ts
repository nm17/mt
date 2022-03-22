import {tl} from '../tl';

/**
 * IMTProto implementation.
 */
export class MTProtoImpl implements tl.functions.IMTProto {
  /**
  * ReqPqMulti
  *
  * @param {Object} values
  * Type Language Object values.
  *
  * @param {tl.primitives.TLInt128} values.nonce
  * Client nonce.
  */
  ReqPqMulti({
    nonce,
  }: {
    nonce: tl.primitives.TLInt128
  }): tl.constructors.ResPq {
    throw new Error('Method not implemented.');
  }

  /**
  * PqInnerData
  *
  * @param {Object} values
  * Type Language Object values.
  *
  * @param {tl.primitives.TLInt128} values.nonce
  * Client nonce.
  *
  * @param {tl.primitives.TLInt128} values.serverNonce
  * Server nonce.
  */
  PqInnerData({
    nonce,
    serverNonce,
  }: {
    nonce: tl.primitives.TLInt128,
    serverNonce: tl.primitives.TLInt128
  }): tl.constructors.ResPq {
    throw new Error('Method not implemented.');
  }
}
