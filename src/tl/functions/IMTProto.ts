import {tl} from '../';

/**
 * MTProto functions interface.
 */
export interface IMTProto {
    ReqPqMulti({
      nonce,
    }: {
      nonce: tl.primitives.TLInt128
    }): tl.constructors.ResPq

    PqInnerData({
      nonce,
      serverNonce,
    }: {
      nonce: tl.primitives.TLInt128
      serverNonce: tl.primitives.TLInt128
    }): tl.constructors.ResPq
}
