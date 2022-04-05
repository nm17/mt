module mtlog

import log

pub struct MtLog {
	tag string
mut:
	logger log.Logger
}

pub fn (mut l MtLog) fatal(message string) {
	l.logger.fatal('[$l.tag] $message')
}

pub fn (mut l MtLog) error(message string) {
	l.logger.error('[$l.tag] $message')
}

pub fn (mut l MtLog) warn(message string) {
	l.logger.warn('[$l.tag] $message')
}

pub fn (mut l MtLog) info(message string) {
	l.logger.info('[$l.tag] $message')
}

pub fn (mut l MtLog) debug(message string) {
	l.logger.debug('[$l.tag] $message')
}
