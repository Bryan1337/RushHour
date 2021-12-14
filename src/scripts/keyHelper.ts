
export const generateKey = (length: number = 16) => {

	let key = '';

	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {

		key += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return key;
}