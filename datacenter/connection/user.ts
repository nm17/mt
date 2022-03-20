import { EventEmitter } from 'events'
import { Socket } from 'net'
import { MTProtoPayload } from '../mtproto'
import { AuthConnection } from '../connection'
import * as log from 'npmlog'

let logTag = 'UserConnection'

export class UserConnection extends EventEmitter {
    auth = new AuthConnection()
    socket: Socket | null = null

    constructor(socket: Socket) {
        super()

        this.socket = socket

        this.on('data', (data) => {
            this.emit('payload', MTProtoPayload.decode(data))
        })

        this.on('payload', (payload) => {
            if (!this.auth.authKeyDone) {
                this.auth.emit('authKey', payload)
            }
        })
    }
}
