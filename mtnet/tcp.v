module mtnet

import io
import net
import log
import mtlog

struct TcpListener {
	address string
	port    int
}

pub fn (t TcpListener) start() {
	mut logger := mtlog.MtLog{
		tag: 'TcpListener'
		logger: log.Log{
			level: log.Level.debug
		}
	}

	mut server := net.listen_tcp(net.AddrFamily.ip, '$t.address:$t.port') or {
		logger.warn('Wrong TCP listener address and port format, TCP listener wont start')
		return
	}

	for {
		mut socket := server.accept() or {
			logger.error('Socket error: $err')
			continue
		}

		logger.debug('Connection established with ' + socket.peer_ip() or {
			logger.error('Socket error: $err')
			continue
		})

		go network_thread(mut socket)
	}
}

fn network_thread(mut socket net.TcpConn) {
	mut logger := mtlog.MtLog{
		tag: 'network_thread'
		logger: log.Log{
			level: log.Level.debug
		}
	}

	mut reader := io.new_buffered_reader(reader: socket)
	mut writer := io.new_multi_writer(socket)

	defer {
		reader.free()
		socket.close() or { logger.error('Cannot close the socket: $err') }
	}

	mut transport_id := []byte{len: 1}
	reader.read(mut transport_id) or {
		logger.debug(err.str())
		return
	}

	if transport_id[0] == 0xef {
		logger.debug('Using abridged transport')
		mut transport := create_abridged_transport(reader, writer)
		user_thread(mut transport)
	} else {
		// TODO: Add support for more transports
		logger.debug('Unsupported transport: $transport_id')
		return
	}
}
