module mtuser

pub struct User {}

// TODO: User will receive reader and writer instead
pub fn (u User) on_data(buf []byte) {
	println('Data')
}
