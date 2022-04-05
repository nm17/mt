module main

import log
import mtnet
import mtlog

fn main() {
	mut logger := mtlog.MtLog{
		tag: 'main'
		logger: log.Log{
			level: log.Level.debug
		}
	}

	mut threads := []thread{}
	mut listeners := []mtnet.Listener{}

	logger.info('Creating TCP listener')
	listeners << mtnet.create_tcp_listener('0.0.0.0', 8443)

	logger.info('Starting listeners')
	for listener in listeners {
		threads << go listener.start()
	}

	logger.info('Started Mobile Telegram')
	threads.wait()
}
