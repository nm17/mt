import { Readable } from 'stream'
import { TLObject } from '../../tl/TLObject'
import * as BigIntExt from 'bigint-buffer'
import * as log from 'npmlog'

export class TLInt extends TLObject {
    value: bigint

    constructor({ value }: { value: bigint }) {
        super(true)

        this.value = value

        log.info(this.constructor.name, this.value.toString())
    }

    static create(data: Readable): TLInt {
        return new TLInt({ value: BigInt.asIntN(32, BigIntExt.toBigIntLE(data.read(4))) })
    }

    serialize(): Buffer {
        return BigIntExt.toBufferLE(BigInt.asUintN(32, this.value), 4)
    }
}
