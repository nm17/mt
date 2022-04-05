module mtnet

import io

struct AbridgedTransport {
mut:
	reader io.Reader
	writer io.Writer
}

pub fn (mut t AbridgedTransport) read(mut buf []byte) ?int {
	mut temp := []byte{len: 1}
	mut ret := t.reader.read(mut temp) ?

	if temp[0] != 0x7f {
		temp = []byte{len: int(temp[0] * 4)}
		t.reader.read(mut temp) ?
	} else {
		// TODO: Add support for 0x7f length
	}

	// Append read bytes to the buffer
	buf << temp

	return ret
}

pub fn (mut t AbridgedTransport) write(buf []byte) ?int {
	// TODO: Create abridged header
	return t.writer.write(buf)
}
