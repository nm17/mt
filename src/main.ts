import {EventEmitter} from 'events';
import {Socket} from 'net';
import {TCPConnection, UserConnection} from './connection';
// import {TLRPCImpl} from 'rpc';
import * as log from 'npmlog';

const tcpConnection = new TCPConnection();
// const tlRpc = new TLRPCImpl();

tcpConnection.start('0.0.0.0', 8443);
tcpConnection.on('connected', (socket: Socket, reader: EventEmitter) => {
  const user = new UserConnection(socket);

  reader.on('data', (data) => user.emit('data', data));
});

log.info('mt', 'Mobile Telegram is running');
