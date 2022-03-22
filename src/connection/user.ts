import {EventEmitter} from 'events';
import {Socket} from 'net';
import {MTProtoPayload} from '../mtproto';
import {AuthConnection} from '../connection';
import {TLObjectReader} from '../tl/TLObjectReader';

/**
 * Class for handling user events such as RPC requests.
 */
export class UserConnection extends EventEmitter {
  auth = new AuthConnection();
  socket: Socket;

  /**
  * UserConnection constructor.
  *
  * @param {Socket} socket
  * User socket.
  */
  constructor(socket: Socket) {
    super();

    this.socket = socket;

    this.on('data', (data) => {
      this.emit('payload', MTProtoPayload.create(data));
    });

    this.on('payload', (payload: MTProtoPayload) => {
      if (payload.authKeyId == 0n) {
        this.auth.emit('authKey', TLObjectReader.create(payload.messageData));
      }
    });
  }
}
