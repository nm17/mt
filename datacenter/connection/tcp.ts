import { EventEmitter } from 'events'
import { createServer, Socket } from 'net'
import * as log from 'npmlog'

let logTag = 'TCPConnection'
let logTagAbridged = 'TCPAbridgedTransport'

class TCPAbridgedTransport extends EventEmitter {
  length = 1
  buffer = Buffer.alloc(0)
  recalculateLength = true

  constructor() {
    super()

    this.on('rawData', (rawData) => {
      this.buffer = Buffer.concat([this.buffer, rawData])

      if (this.recalculateLength) {
        if (this.buffer.slice(0, 1).toString('hex') == 'ef') {
          if (this.buffer.length == 1) {
            this.buffer = Buffer.alloc(0)
            return
          } else {
            this.buffer = this.buffer.slice(1)
          }
        }

        if (this.buffer.length < 4 && this.buffer.slice(0, 1).toString('hex') == '7f') return

        if (this.buffer.slice(0, 1).toString('hex') == '7f') {
          this.length += (this.buffer.readUIntLE(1, 3) * 4) - 4
          this.buffer = this.buffer.slice(3)
        } else {
          this.length += (this.buffer.readUIntLE(0, 1) * 4) - 1
          this.buffer = this.buffer.slice(1)
        }

        log.info(logTagAbridged, `Length: ${this.length}`)

        this.recalculateLength = false
      }

      if (this.buffer.length == this.length) {
        log.info(logTagAbridged, 'Received data')
        this.emit('data', this.buffer)
        this.recalculateLength = true
        this.length = 0
      }
    })
  }
}

export class TCPConnection extends EventEmitter {
  callback: Function = () => {}

  start(address: string, port: number) {
    var server = createServer((socket: Socket) => {
      let transport: TCPAbridgedTransport | null = null
      let transportNegotiationFinished = false
      let buffer = Buffer.alloc(0)

      let reader = new EventEmitter()

      log.info(logTag, `Established connection ${socket.remoteAddress}:${socket.remotePort}`)

      this.emit('connected', socket, reader)

      socket.on('data', (data) => {
        if (!transportNegotiationFinished) {
          buffer = Buffer.concat([buffer, data])

          let transportId = buffer.slice(0, 1).toString('hex')

          if (transportId == 'ef') {
            log.info(logTag, 'Using TCPAbridgedTransport')
            transport = new TCPAbridgedTransport()
          }

          transport?.on('data', (data) => reader.emit('data', data))
          transport?.emit('rawData', buffer)

          transportNegotiationFinished = true
        } else {
          if (transport != null) {
            transport.emit('rawData', data)
          } else {
            log.error(logTag, 'Unknown transport, aborting')
            socket.end(() => socket.destroy())
          }
        }
      })

      socket.on('close', () => socket.end(() => socket.destroy()))
      socket.on('error', (err) => {
        log.error(logTag, err.toString())
        socket.end(() => socket.destroy())
      })
    })

    server.on('error', (err) => log.error(logTag, err.toString()))
    server.listen(port, address)

    log.info(logTag, `Listening on ${address}:${port}`)
  }
}
