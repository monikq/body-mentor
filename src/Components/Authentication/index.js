import axios from 'axios'

const env = 'http://localhost:8888/'
const link = `${env}body-mentor/authorisation/`

export const login = async ({email, password}) => {
	let response = await axios
		.post(
			`${link}login.php`,
			{
				email: email,
				password: password,
			},
			{
				withCredentials: true,
				timeout: 3 * 1000,
			}
		)
		.catch(error => {
			console.log(error)
		})
	if (!response) {
		var obj = {
			success: 0,
			msg: 'Network Error. Check your internet connection and try again.',
		}
		return obj
	}
	//whos responsibility should that be? > context hook?
	if ((await response.data.success) === 1) {
		let user = response.data.user
		sessionStorage.setItem('userData', JSON.stringify(user))
	}
	return await response.data
}

export const register = async ({username, email, password}) => {
	let response = await axios
		.post(
			`${link}register.php`,
			{
				username: username,
				email: email,
				password: password,
			},
			{
				withCredentials: true,
				timeout: 3 * 1000,
			}
		)
		.catch(error => {
			console.log(error)
		})

	if (!response) {
		var obj = {
			success: 0,
			msg: 'Network Error. Check your internet connection and try again.',
		}
		return obj
	}
	return await response.data
}

//lock account
//analitics: get Registration Date
