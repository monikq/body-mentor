import axios from 'axios'

const domain = process.env.REACT_APP_API_URL.replace("';", '')
const link = `${domain}calories/`

export const fetchTotalCaloriesTodayForUserId = async user_id => {
	if (!user_id) {
		console.log('error user_id not available')
	} //add it to arrays errors

	//if undifined test failed > integration test
	//from date > future feature can be added here
	let response = await axios
		.post(`${link}fetch_total_calories_today_for_user_id.php`, {
			user_id: user_id,
		})
		/* if (response.success === 1) {
                    this.setState({
                        dailyCaloriesTotal: data.total,
                        dailyCaloriesRecords: data.record
                    }, () => {
                            console.log("!!:)!!!!!!!!!!!!!!!!!!!!!!!!! this.state.dailyCaloriesTotal", this.state.dailyCaloriesTotal);
                        }

                    )
                } */
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

	//console.log('END - server response fetchCalories() :', response.data)
	//console.log(
	//	'TO DO [PHP] return total and records for calories for today in PHP'
	//)

	return response.data //async function should we await for anything? I dont think so
}

export const fetchCaloriesRecordTodayByUserID = async user_id => {
	if (!user_id) {
		console.log('error user_id not available')
	} //add it to arrays errors

	//if undifined test failed > integration test
	//from date > future feature can be added here
	let response = await axios
		.post(`${link}fetch_calories_today_record_for_user_id.php`, {
			user_id: user_id,
		})
		/* if (response.success === 1) {
                    this.setState({
                        dailyCaloriesTotal: data.total,
                        dailyCaloriesRecords: data.record
                    }, () => {
                            console.log("!!:)!!!!!!!!!!!!!!!!!!!!!!!!! this.state.dailyCaloriesTotal", this.state.dailyCaloriesTotal);
                        }

                    )
                } */
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

	//console.log('END - server response fetchCalories() :', response.data)
	//console.log(
	//	'TO DO [PHP] return total and records for calories for today in PHP'
	//)

	return response.data //async function should we await for anything? I dont think so
}

export const addCalories = async (user_id, values) => {
	console.log('!!!!!!!!!! 2 addCalories - user:', user_id)
	//console.log('addCalories - values:', values)
	console.log('!!!!!!!!!! 2 addCalories - values.weight:', values)
	console.log(
		'!!!!!!!!!! 2 addCalories - values.weight g:',
		values.weight_grams
	)
	console.log('!!!!!!!!!! 2 addCalories - values.weight k:', values.kCal_100g)
	console.log(
		'!!!!!!!!!! 2 addCalories - values.weight f:',
		values.foodCategory
	)

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

	if (response.data.success)
		console.log('server response addCalories() :', response.data)
	console.log('!!!!!!!!!@@@@@@@@ response.data', response.data)
	return response.data
}
