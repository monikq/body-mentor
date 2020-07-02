import React, {useContext, useState, useEffect, useCallback} from 'react'
import {Route, useHistory} from 'react-router-dom'
import {Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {UserContext} from '../../Components/Utilities/UserContext'
import {
	fetchNewDefaultTrainingsForUserId,
	addNewTrainingRecord,
	fetchHistoryTrainingsRecordForUserId,
} from '../../Components/Trainings'
import NewTrainingDropdown from './NewTrainingDropdown'
import AddNewTrainingForm from './AddNewTrainingForm'
import AddNewTrainingConfirmation from './AddNewTrainingConfirmation'
import TrainingsRecordHistory from './TrainingsRecordHistory'
import {NotFound} from '../../Components/Errors'

//repetition in AddNewCalories component make a theme context for everybody
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
}))

export default routeProps => {
	const classes = useStyles()
	let history = useHistory()
	const {user} = useContext(UserContext)
	const [trainingsList, setTrainingList] = useState()
	const [currentStep, setCurrentStep] = useState(1)
	const [trainingId, setTrainingId] = useState(1)
	const [newTrainingRecord, setNewTrainingRecord] = useState()
	const [trainingsRecordUserHistory, setTrainingsRecordUserHistory] = useState()

	if (!user) {
		console.log('error - user not available')
	}

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

	useEffect(() => {
		async function fetchData() {
			const response = await fetchHistoryTrainingsRecordForUserId(user.user_id)

			console.log('trainings page: response', response)

			if (response.success === 0 || !response.success) {
				setTrainingsRecordUserHistory(false)
			} else if (response.success === 1) {
				setTrainingsRecordUserHistory(response.data)
				console.log('[php] Response trainings data', response)
			} else {
				console.log('[php] Error fetching trainings data', response)
			}
		}

		fetchData()
	}, [newTrainingRecord])

	const confirm = () => {
		setCurrentStep(1)
		history.push('/trainings')

		console.log('trainingRecord_' + trainingId)
	}

	const updateFormData = useCallback(async (formData, sessionName) => {
		setNewTrainingRecord(formData)

		const response = await addNewTrainingRecord(user.user_id, formData)
		if (response.success === 1) {
			if (sessionStorage.getItem(sessionName)) {
				sessionStorage.removeItem(sessionName)
			}
			setCurrentStep(2)
			return {confirmation: response.msg}
		} else if (response.success === 0) {
			return {error: response.msg}
		} else if (!response) {
			return {error: 'Something went wrong, please try again.'}
		} else {
			console.log('error adding new calories record')
		}

		setCurrentStep(2)
	})

	const _renderForm = training => {
		switch (currentStep) {
			case 1:
				return (
					<AddNewTrainingForm
						training={training}
						updateFormData={updateFormData}
						sessionName={'trainingRecord_' + training.id}
					/>
				)
			case 2:
				return (
					<AddNewTrainingConfirmation
						trainingRecord={newTrainingRecord}
						confirm={confirm}
						msg="training has been added "
					/>
				)
			default:
				return (
					<AddNewTrainingForm
						training={training}
						updateFormData={updateFormData}
						sessionName={'trainingRecord_' + training.id}
					/>
				)
		}
	}

	const _renderSelectTrainingDropdown = () => {
		return (
			<>
				<NewTrainingDropdown
					{...routeProps}
					trainingToStart={trainingId}
					trainingsList={trainingsList}
				/>
				<TrainingsRecordHistory
					trainingsRecordUserHistory={trainingsRecordUserHistory}
				/>
			</>
		)
	}

	return (
		<>
			{trainingsList ? (
				<>
					<Route
						exact
						path={routeProps.computedMatch.url}
						render={() => _renderSelectTrainingDropdown()}
					/>
					<Route
						path={`${routeProps.computedMatch.url}/:trainingId`}
						render={props => {
							const training = trainingsList.find(
								training => training.id === props.match.params.trainingId
							)
							if (!training) {
								return (
									<>
										{_renderSelectTrainingDropdown()}
										<NotFound />
									</>
								)
							}

							return _renderForm(training)
						}}
					/>
				</>
			) : (
				<Typography gutterBottom align="center">
					Loading...
				</Typography>
			)}
		</>
	)
}
