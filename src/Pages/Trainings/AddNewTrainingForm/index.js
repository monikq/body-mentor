import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
	FormHelperText,
	Button,
	FormControl,
	Typography,
	InputLabel,
	OutlinedInput,
	Container,
	Grid,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	margin: {
		margin: theme.spacing(2, 0, 1),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	paper: {
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	formControl: {
		margin: theme.spacing(2, 0, 1),
		minWidth: 120,
	},
}))

export default ({training, updateFormData, sessionName}) => {
	const classes = useStyles()
	const [error, setError] = useState(false)
	const [confirmation, setConfirmation] = useState(false)

	const TRAINING_RECORD_INIT = () => {
		const initTrainingRecordsArray = []

		if (sessionStorage.getItem(sessionName)) {
			return JSON.parse(sessionStorage.getItem(sessionName))
		}

		let index = 0

		training.excesises.map(excersise => {
			for (let i = 1; i < 4; i++) {
				initTrainingRecordsArray[index] = {
					excersise_id: excersise['id'],
					name: excersise['name'],
					series: i,
					repetitions: '',
					weight: '',
					repeat: excersise['repeat'],
					previousExcersiseRecord: excersise['previousExcersiseRecord'],
				}

				index++
			}
		})
		return initTrainingRecordsArray
	}

	const [trainingRecord, setTrainingRecord] = useState(TRAINING_RECORD_INIT())

	const handleSubmit = async event => {
		event.preventDefault()
		setError(false)
		setConfirmation(false)

		let confirm = window.confirm('Do you want to complete your training?')
		if (confirm === true) {
			//console.log('add new training trainingRecord: ', trainingRecord)

			const response = await updateFormData(trainingRecord)

			//console.log('add new training response: ', response)

			/* if (response.confirmation) {
				setConfirmation(response.confirmation)
			} else  */
			if (response.error) {
				setError(response.error)
			}
		}
	}

	const handleChange = (attribute, excersise_id, series, index) => event => {
		const newTrainingRecordArray = [...trainingRecord]
		newTrainingRecordArray[index][attribute] = parseFloat(event.target.value)

		setTrainingRecord(newTrainingRecordArray)

		sessionStorage.setItem(sessionName, JSON.stringify(newTrainingRecordArray))
		/* console.log('session storage- save:', newTrainingRecordArray)

		console.log('session storage- sessionName:', sessionName)
		console.log(
			'session storage- getItem:',
			sessionStorage.getItem(sessionName)
		) */

		/* //it outputs object not array > map is undefined for objects
		 setTrainingRecord(trainingRecord => ({
			...trainingRecord,
			[index]: {
				...trainingRecord[index],
				[attribute]: parseFloat(event.target.value),
			},
		})) */
	}

	const _renderInputs = (id, index, series, repetitions, weight, repeat) => {
		return (
			<>
				<Grid item xs={6}>
					<FormControl
						/* className={clsx(classes.margin)} */
						variant="outlined"
						fullWidth
						key={`${index}_${series}_repetitions`}
					>
						<InputLabel htmlFor="component-outlined">repetitions</InputLabel>
						<OutlinedInput
							required
							min="1"
							placeholder={repeat}
							id="repetitions"
							label="repetitions"
							type="number"
							value={repetitions}
							onChange={handleChange('repetitions', id, series, index)}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl
						/* className={clsx(classes.margin)} */
						variant="outlined"
						fullWidth
						key={`${index}_${series}_weight`}
					>
						<InputLabel htmlFor="component-outlined">weight [kg]</InputLabel>
						<OutlinedInput
							required
							min="1"
							placeholder="kg"
							id="weight"
							label="weight [kg]"
							type="number"
							value={weight}
							onChange={handleChange('weight', id, series, index)}
						/>
					</FormControl>
				</Grid>
			</>
		)
	}

	const _renderExcersiseForm = (
		name,
		previousExcersiseRecord,
		index,
		repeat
	) => {
		return (
			<>
				<Grid item xs={12}>
					<Typography
						variant="subtitle1"
						align="center"
						key={`${index}_${name}_title`}
					>
						{name} - {repeat} times
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant="subtitle1"
						align="center"
						key={`${index}_${name}_previouse`}
					>
						{previousExcersiseRecord}
					</Typography>
				</Grid>
			</>
		)
	}

	const _renderForm = () => {
		let previouseExcersiseId = -100
		if (!trainingRecord || trainingRecord === undefined) {
			return (
				<Typography gutterBottom align="left">
					Loading...
				</Typography>
			)
		} else if (trainingRecord !== undefined) {
			return (
				<>
					{trainingRecord.map(
						(
							{
								excersise_id,
								name,
								repeat,
								previousExcersiseRecord,
								series,
								repetitions,
								weight,
							},
							index
						) => {
							if (previouseExcersiseId !== excersise_id) {
								previouseExcersiseId = excersise_id
								return (
									<>
										{_renderExcersiseForm(
											name,
											previousExcersiseRecord,
											index,
											repeat
										)}

										{_renderInputs(
											excersise_id,
											index,
											series,
											repetitions,
											weight,
											repeat
										)}
									</>
								)
							}
							return (
								<>
									{_renderInputs(
										excersise_id,
										index,
										series,
										repetitions,
										weight,
										repeat
									)}
								</>
							)
						}
					)}
				</>
			)
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<Typography variant="h5" align="center" gutterBottom>
				{training.name}
			</Typography>

			<form
				onSubmit={async event => {
					handleSubmit(event)
				}}
			>
				<Grid container spacing={1}>
					{_renderForm()}

					<Grid item xs={12}>
						<FormControl error={error}>
							<FormHelperText>{error}</FormHelperText>
						</FormControl>
						<FormControl error={false}>
							<FormHelperText>{confirmation}</FormHelperText>
						</FormControl>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disableRipple
							size="small"
							color="primary"
							className={classes.margin}
						>
							Add record
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}
