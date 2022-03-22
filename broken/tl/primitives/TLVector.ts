import { Readable } from 'stream'
import { TLObject } from '../../tl/TLObject'
import { TLObjectFactory } from '../../tl/TLObjectFactory'
import * as log from 'npmlog'

export class TLVector<T> extends TLObject {
    value: Array<T>

    constructor({ value }: { value: Array<T> }) {
        super(true)

        this.value = value

        log.info(this.constructor.name, this.value.toString())
    }

    static create<T>(data: Readable): TLVector<T> {
        let length: number = (data.read(4) as Buffer).readInt32LE()
        let arr: Array<T> = new Array<T>()

        for (let i: number = 0; i < length; i++)
            arr.push(TLObjectFactory.createFromReadable(data) as unknown as T)

        return new TLVector<T>({ value: arr })
    }

    serialize(): Buffer {
        let final: Array<Buffer> = new Array<Buffer>()

        let length: Buffer = Buffer.alloc(4)
        length.writeInt32LE(this.value.length)

        final.push(length)

        for (let i: number = 0; i < this.value.length; i++)
            final.push((this.value[i] as unknown as TLObject).serialize())

        return Buffer.concat(final)
    }
}
