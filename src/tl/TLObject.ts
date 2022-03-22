import {Readable} from 'stream';
import * as log from 'npmlog';

/**
 * Class for handling Type Language objects.
 *
 * This handles Type Language primitives, constructors and functions.
 */
export class TLObject {
  /**
   * Constructor or function ID.
   */
  static id: string = '00000000';

  /**
   * Same as TLObject.id, but can be accessed with the constructed class.
   */
  id: string = TLObject.id;

  /**
   * If the TLObject is a function.
   */
  isFunction: boolean = false;

  /**
   * Map of possible constructor values.
   */
  values: Map<string, TLObject> = new Map<string, TLObject>();

  /**
   * TLObject constructor.
   *
   * @param {boolean} [fromConstructor]
   * Checks if the class was inherited or not.
   *
   * @throws {Error}
   * You should not create new TLObject class using
   * a class constructor, use TLObjectReader.create() instead.
   */
  constructor(fromConstructor: boolean = false) {
    if (!fromConstructor) {
      log.error(
          this.constructor.name,
          'You should not create new TLObject class using' +
          ' a class constructor, use TLObjectReader.create() instead.',
      );

      throw new Error(
          'You should not create new TLObject class using' +
            ' a class constructor, use TLObjectReader.create() instead.',
      );
    }
  }

  /**
   * TLObject creator. Used for constructor mapping.
   *
   * @param {Readable} data
   * Readable byte stream.
   *
   * @throws {Error}
   * You should not create new TLObject class using
   * a class constructor, use TLObjectReader.create() instead.
   */
  static create(data: Readable): TLObject {
    log.error(
        this.constructor.name,
        'You should not create new TLObject class using' +
        ' a class constructor, use TLObjectReader.create() instead.',
    );

    throw new Error(
        'You should not create new TLObject class using' +
          ' a class constructor, use TLObjectReader.create() instead.',
    );
  }

  /**
   * TLObject serializer.
   *
   * @throws {Error}
   * You should not create new TLObject class using
   * a class constructor, use TLObjectReader.create() instead.
   */
  serialize(): Buffer {
    log.error(
        this.constructor.name,
        'You should not create new TLObject class using' +
        ' a class constructor, use TLObjectReader.create() instead.',
    );

    throw new Error(
        'You should not create new TLObject class using' +
          ' a class constructor, use TLObjectReader.create() instead.',
    );
  }
}
