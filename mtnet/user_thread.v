module mtnet

import log
import mtlog
import mtnet
import mtuser

pub fn user_thread(mut transport mtnet.Transport) {
	mut logger := mtlog.MtLog{
		tag: 'user_thread'
		logger: log.Log{
			level: log.Level.debug
		}
	}

	mut user := mtuser.User{}
	mut buf := []byte{}

	logger.debug('Initialized user_thread')

	for {
		transport.read(mut buf) or {
			logger.debug('Received EOF')
			break
		}

		// TODO: Do something, maybe TL parsing?
		logger.debug(buf.str())
	}
}
