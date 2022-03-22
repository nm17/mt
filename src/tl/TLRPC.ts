import {TLObject} from './TLObject';
import {tl} from './';

/**
 * Type Language RPC super class.
 *
 * This handles all RPC subclasses like IMTProto.
 */
export class TLRPC {
  /**
   * IMTProto implementation, can be undefined.
   */
  mtprotoImpl: tl.functions.IMTProto | undefined = undefined;

  /**
   * IMTProto mapping, used for fast and easy RPC implementation execution.
   */
  mtprotoMapping = new Map<string, any>([
    [tl.constructors.ReqPqMulti.id, this.mtprotoImpl?.ReqPqMulti],
    [tl.constructors.ResPq.id, this.mtprotoImpl?.PqInnerData],
  ]);

  /**
   * Executed when new tlObject event is received.
   *
   * @param {TLObject} tlObj - Type Language Object. If tlObj.ifFunction
   * is true, the object is passed to the correct implementation.
   */
  onTlObject(tlObj: TLObject) {
    if (tlObj.isFunction) {
      const func = this.mtprotoMapping.get(tlObj.id);

      if (func) {
        func();
      }
    }
  }
}
