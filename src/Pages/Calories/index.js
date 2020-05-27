import React, {useContext, useState, useEffect, useCallback} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography, Container} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import {UserContext} from '../../Components/Utilities/UserContext'
import {
	addCalories,
	fetchTotalCaloriesTodayForUserId,
	fetchCaloriesRecordTodayByUserID,
} from '../../Components/Calories'

import TotalDailyCaloriesSummary from './TotalDailyCaloriesSummary'
import AddNewCaloriesRecordForm from './AddNewCaloriesRecordForm'
import DailyCaloriesRecord from './DailyCaloriesRecord'

//repetition in AddNewCalories component
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
}))

export default () => {
	const classes = useStyles()
	const {user} = useContext(UserContext)

	//const [formValues, setFormValues] = useState()
	const [totalDailySummary, setTotalDailySummary] = useState({
		total_kcal_today: '--',
		total_grams_today: '--',
	})
	const [formValues, setFormValues] = useState()
	const [dailyRecords, setDailyRecords] = useState()

	if (!user) {
		console.log('error - user not available')
	}

	useEffect(() => {
		async function fetchData() {
			const responseTotal = await fetchTotalCaloriesTodayForUserId(user.user_id)
			const responseRecord = await fetchCaloriesRecordTodayByUserID(
				user.user_id
			)

			console.log('responseRecord', responseRecord)

			if (responseTotal.success === 0 || !responseTotal.success) {
				console.log('something went wrong please try again with db response 0')
			} else if (responseTotal.success === 1) {
				setTotalDailySummary(responseTotal.data)
			} else {
				console.log('error fetching total calories data')
			}

			if (responseRecord.success === 0 || !responseRecord.success) {
				console.log('something went wrong please try again with db response 0')
			} else if (responseRecord.success === 1) {
				setDailyRecords(responseRecord.data)
			} else {
				console.log('error fetching calories record')
			}
		}

		console.log('dailyRecords', dailyRecords)

		fetchData()
	}, [formValues])

	const updateFormData = useCallback(async formData => {
		const response = await addCalories(user.user_id, formData)

		if (response.success === 1) {
			setFormValues(formData)
			return {confirmation: response.msg}
		} else if (response.success === 0) {
			return {error: response.msg}
		} else if (!response) {
			return {error: 'Something went wrong, please try again.'}
		} else {
			console.log('error adding new calories record')
		}
	})

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={false} sm={1} />
				<Grid item xs={12} sm={10}>
					<TotalDailyCaloriesSummary {...totalDailySummary} />
					<AddNewCaloriesRecordForm updateFormData={updateFormData} />
					<DailyCaloriesRecord dailyRecords={dailyRecords} />
				</Grid>
				<Grid item xs={false} sm={1} />
			</Grid>
		</div>
	)
}
