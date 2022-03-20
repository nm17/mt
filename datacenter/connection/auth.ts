import { EventEmitter } from 'stream'
import * as log from 'npmlog'

let logTag = 'AuthConnection'

let authState = {
    pqReq: 1
}

export class AuthConnection extends EventEmitter {
    authKeyState = authState.pqReq
    authKeyDone = false
    loginDone = false

    constructor() {
        super()

        this.on('authKey', (payload) => {
            let messageData: Buffer = payload['messageData']
            let hash = messageData.slice(0, 4).reverse().toString('hex')

            if (this.authKeyState == authState.pqReq && hash == 'be7e8ef1') {
                log.info(logTag, 'req_pq_multi#be7e8ef1 nonce:int128 = ResPQ;')

                let pq = BigInt.asIntN(128, BigInt(`0x${messageData.slice(4, 20).reverse().toString('hex')}`))

                log.info(logTag, `nonce: ${pq}`)
            }
        })
    }
}
