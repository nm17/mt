import {EventEmitter} from 'stream';
import {TLObject} from '../tl/TLObject';
import {tl} from '../tl';
import * as log from 'npmlog';

/**
 * Class for authorizing connection between the user and
 * the datacenter.
 *
 * Can be used for creating auth_key and checking if the user
 * is logged in/registered.
 *
 * Also Jesus fucking Christ this is hard ✝️🛐
 */
export class AuthConnection extends EventEmitter {
  /**
   * AuthConnection constructor.
   */
  constructor() {
    super();

    this.on('authKey', (tlObj: TLObject) => {
      if (tlObj.id == tl.constructors.ReqPqMulti.id) {
        const req = tlObj as tl.constructors.ReqPqMulti;
        const nonce: tl.primitives.TLInt128 =
          req.values.get('nonce')! as tl.primitives.TLInt128;

        log.info(
            this.constructor.name,
            nonce.value.toString(),
        );
      }
    });
  }
}
