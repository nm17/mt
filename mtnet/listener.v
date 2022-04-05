module mtnet

interface Listener {
	address string
	port int
	start()
}

pub fn create_tcp_listener(address string, port int) TcpListener {
	return TcpListener{
		address: address
		port: port
	}
}
