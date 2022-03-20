import * as log from 'npmlog'

let logTag = 'MTProtoPayload'

export class MTProtoPayload {
    static decode(payload: Buffer) {
        let authKeyId = payload.readBigInt64LE(0)

        if (authKeyId == BigInt(0)) {
            let messageId = payload.readBigInt64LE(8)
            let messageDataLength = payload.readInt32LE(16)
            let messageData = payload.slice(20, 20 + messageDataLength)

            return { authKeyId, messageId, messageDataLength, messageData }
        } else {
            log.error(logTag, 'Encrypted payloads are not implemented')
            return { authKeyId: BigInt(0), messageId: BigInt(0), messageDataLength: 0, messageData: Buffer.alloc(0) }
        }
    }
}
