import axios from 'axios'

const domain = process.env.REACT_APP_API_URL.replace("';", '')
const link = `${domain}authorisation/`

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
			console.log(error, ' link', `${link}login.php`)
		})
	if (!response) {
		var obj = {
			success: 0,
			msg: 'Network Error. Check your internet connection and try again.',
		}
		return obj
	}

	//	SAVE USER DATA IN SESSION
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
