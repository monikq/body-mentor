import axios from 'axios'

const domain = process.env.REACT_APP_API_URL.replace("';", '')
const link = `${domain}trainings/`

/* history */
export const fetchHistoryTrainingsRecordForUserId = async user_id => {
	if (!user_id) {
		console.log('error user_id not available')
	}

	let response = await axios
		.post(`${link}fetch_history_trainings_record_for_user_id.php`, {
			user_id: user_id,
		})
		.catch(error => {
			console.log('Error fetch total daily calories from  ', error)
			console.log(
				'link',
				`${link}fetch_history_trainings_record_for_user_id.php`
			)
		})

	if (!response) {
		const obj = {
			success: 0,
			msg: 'Network Error. Check your internet connection and try again.',
		}

		console.log('error obj:  ', obj)

		return obj
	}

	console.log('fetch training history record  ', response.data)

	return response.data
}

export const fetchNewDefaultTrainingsForUserId = async user_id => {
	if (!user_id) {
		console.log('error user_id not available')
	}

	let response = await axios
		.post(`${link}fetch_new_default_trainings_for_user_id.php`, {
			user_id: user_id,
		})
		.catch(error => {
			console.log('Error fetch total daily calories from  ', error)
			console.log('link', `${link}fetch_new_default_trainings_for_user_id.php`)
		})

	if (!response) {
		var obj = {
			success: 0,
			msg: 'Network Error. Check your internet connection and try again.',
		}
		return obj
	}
	return response.data
}

export const addNewTrainingRecord = async (user_id, values) => {
	let response = await axios
		.post(`${link}add_new_training_record.php`, {
			user_id: user_id,
			values: values,
		})
		.catch(error => {
			console.log('Error - addNewTrainingRecord:', error)
		})

	if (!response) {
		var obj = {
			success: 0,
			msg: 'Network Error. Check your internet connection and try again.',
		}
		return obj
	}

	return response.data
}
