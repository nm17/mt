import { EventEmitter } from 'events'
import { Socket } from 'net'
import { TCPConnection, UserConnection } from './connection'
import * as log from 'npmlog'


(BigInt.prototype as any).toJSON = function () { return this.toString() }

let logTag = 'datacenter.js'

let tcpConnection = new TCPConnection()

tcpConnection.start('0.0.0.0', 443)
tcpConnection.on('connected', (socket: Socket, reader: EventEmitter) => {
  let user = new UserConnection(socket)

  reader.on('data', (data) => user.emit('data', data))
})

log.info(logTag, 'datacenter.js is running')
