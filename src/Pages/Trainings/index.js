import React, {useContext, useState, useEffect, useCallback} from 'react'
import {Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {UserContext} from '../../Components/Utilities/UserContext'
import {
	fetchNewDefaultTrainingsForUserId,
	addNewTrainingRecord,
} from '../../Components/Trainings'
import NewTrainingDropdown from './NewTrainingDropdown'
import AddNewTrainingForm from './AddNewTrainingForm'
import AddNewTrainingConfirmation from './AddNewTrainingConfirmation'

//repetition in AddNewCalories component make a theme context for everybody
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
}))

export default () => {
	const classes = useStyles()
	const {user} = useContext(UserContext)
	const [trainingsList, setTrainingList] = useState()
	const [currentStep, setCurrentStep] = useState(0)
	const [trainingToStart, setTrainingToStart] = useState(0)
	const [trainingRecord, setTrainingRecord] = useState()

	if (!user) {
		console.log('error - user not available')
	}
	//console.log('trainingToStart', trainingToStart)
	useEffect(() => {
		async function fetchData() {
			const response = await fetchNewDefaultTrainingsForUserId(user.user_id)

			if (response.success === 0 || !response.success) {
				setTrainingList(false)
			} else if (response.success === 1) {
				setTrainingList(response.data)
			} else {
				console.log('[php] Error fetching trainings data', response)
			}
		}

		fetchData()
	}, [user.user_id])

	const updateDropdownData = trainingId => {
		setTrainingToStart(trainingId)
		setCurrentStep(1)
	}

	/* const confirm = () => {
		setCurrentStep(0)
	} */

	const updateFormData = useCallback(async formData => {
		//setCurrentStep(2)
		console.log('trainings - formData', formData)

		setTrainingRecord(formData)

		const response = await addNewTrainingRecord(user.user_id, formData)

		console.log('!!!!trainings - response', response)

		if (response.success === 1) {
			//setFormValues(formData)
			setCurrentStep(2)
			return {confirmation: response.msg}
		} else if (response.success === 0) {
			return {error: response.msg}
		} else if (!response) {
			return {error: 'Something went wrong, please try again.'}
		} else {
			console.log('error adding new calories record')
		}
	})

	const _renderSwitch = () => {
		if (!trainingsList || trainingsList === undefined) {
			return (
				<Typography gutterBottom align="center">
					Loading...
				</Typography>
			)
		} else if (trainingsList !== undefined) {
			switch (currentStep) {
				case 0:
					return (
						<NewTrainingDropdown
							trainingToStart={trainingToStart}
							trainingsList={trainingsList}
							updateDropdownData={updateDropdownData}
						/>
					)
				case 1:
					return (
						<AddNewTrainingForm
							training={trainingsList[trainingToStart]}
							updateFormData={updateFormData}
							sessionName={'trainingRecord_' + trainingToStart}
						/>
					)
				case 2:
					return (
						<AddNewTrainingConfirmation
							trainingRecord={trainingRecord}
							confirm={() => {
								setCurrentStep(0)
							}}
							msg="training has been added "
						/>
					)
				default:
					return (
						<NewTrainingDropdown
							trainingsList={trainingsList}
							updateDropdownData={updateDropdownData}
						/>
					)
			}
		}
	}

	return (
		<div className={classes.root}>
			<Grid container key="container">
				<Grid item xs={false} sm={1} key="left" />
				<Grid item xs={12} sm={10} key="content">
					{_renderSwitch()}
				</Grid>
				<Grid item xs={false} sm={1} key="right" />
			</Grid>
		</div>
	)
}
