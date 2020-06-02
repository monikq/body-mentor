import axios from 'axios'

const domain = process.env.REACT_APP_API_URL.replace("';", '')
const link = `${domain}calories/`

export const fetchTotalCaloriesTodayForUserId = async user_id => {
	if (!user_id) {
		console.log('error user_id not available')
	}

	let response = await axios
		.post(`${link}fetch_total_calories_today_for_user_id.php`, {
			user_id: user_id,
		})

		.catch(error => {
			console.log('Error fetch total daily calories from ', error)
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

export const fetchCaloriesRecordTodayByUserID = async user_id => {
	if (!user_id) {
		console.log('error user_id not available')
	}

	let response = await axios
		.post(`${link}fetch_calories_today_record_for_user_id.php`, {
			user_id: user_id,
		})

		.catch(error => {
			console.log('Error fetch total daily calories from ', error)
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

export const addCalories = async (user_id, values) => {
	let response = await axios
		.post(`${link}add_calories_record.php`, {
			user_id: user_id,
			weight_grams: values.weight_grams,
			kCal_100g: values.kCal_100g,
			foodCategory: values.foodCategory,
		})
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

	return response.data
}
