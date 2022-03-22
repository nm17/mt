import {Readable} from 'stream';
import {TLObject} from './TLObject';
import {tl} from './';
import * as log from 'npmlog';

/**
 * Class for reading TLObject data.
 */
export class TLObjectReader {
  /**
   * Constructor mapping, used for fast and easy Type Language Object creation.
   */
  static mapping: Map<string, typeof TLObject.create> =
    new Map<string, typeof TLObject.create>([
      [tl.constructors.ReqPqMulti.id, tl.constructors.ReqPqMulti.create],
      [tl.constructors.ResPq.id, tl.constructors.ResPq.create],
    ]);

  /**
   * Read TLObject from Buffer.
   *
   * @param {Readable} data
   * Type Language Buffer.
   *
   * @return {TLObject}
   * Constructed Type Language Object.
   *
   * @throws {Error}
   * Mapping does not contain constructorId.
   */
  static create(data: Buffer): TLObject {
    const constructorId: string = data.slice(0, 4).reverse().toString('hex');
    const constructor: typeof TLObject.create | undefined =
      this.mapping.get(constructorId);

    if (constructor != undefined) {
      log.info('TLObjectReader', `Using ${constructorId}.`);
      return constructor(Readable.from(data.subarray(4)));
    } else {
      log.error(
          'TLObjectReader',
          `Mapping does not contain ${constructorId}.`,
      );

      throw new Error(`Mapping does not contain ${constructorId}.`);
    }
  }

  /**
   * Read TLObject from Readable stream.
   *
   * @param {Readable} data
   * Type Language Readable stream.
   *
   * @return {TLObject}
   * Constructed Type Language Object.
   *
   * @throws {Error}
   * Mapping does not contain constructorId.
   */
  static createFromReadable(data: Readable): TLObject {
    const constructorId: string = data.read(4).reverse().toString('hex');
    const constructor: typeof TLObject.create | undefined =
      this.mapping.get(constructorId);

    if (constructor != undefined) {
      log.info(this.constructor.name, `Using ${constructorId}.`);
      return constructor(data);
    } else {
      log.error(
          'TLObjectReader',
          `Mapping does not contain ${constructorId}.`,
      );

      throw new Error(`Mapping does not contain ${constructorId}.`);
    }
  }
}
