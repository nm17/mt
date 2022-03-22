import { TLObjectAbstract } from '../../tl/TLObjectAbstract'
import * as log from 'npmlog'

export class TLString extends TLObjectAbstract {
    value: string

    constructor({ value }: { value: string }) {
        super(true)

        this.value = value

        log.info(this.constructor.name, this.value)
    }

    static create(data: Buffer): TLString {
        return new TLInt128({ value: BigInt.asIntN(128, BigIntExt.toBigIntLE(data)) })
    }

    serialize(): Buffer {
        return Buffer.from(this.value, 'utf-8')
    }
}
