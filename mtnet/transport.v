module mtnet

import io

interface Transport {
mut:
	reader io.Reader
	writer io.Writer
	read(mut buf []byte) ?int
	write(buf []byte) ?int
}

pub fn create_abridged_transport(reader io.Reader, writer io.Writer) AbridgedTransport {
	return AbridgedTransport{
		reader: reader
		writer: writer
	}
}
