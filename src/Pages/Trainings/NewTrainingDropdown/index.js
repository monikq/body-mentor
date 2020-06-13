import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
	Container,
	Grid,
	FormHelperText,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
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

export default ({trainingsList, updateDropdownData, trainingToStart}) => {
	const classes = useStyles()
	//const [values, setValues] = useState({foodCategory: 'click and choose'})
	const [selectedTraining, setSelectedTraining] = useState(trainingToStart)
	const [error, setError] = useState(false)

	const handleSubmit = async event => {
		event.preventDefault()
		//console.log('dropdown trainingsList selected', trainingsList)
		//console.log('dropdown training selected', selectedTraining)
		updateDropdownData(selectedTraining)
	}

	const handleSelect = prop => event => {
		event.preventDefault()
		setError(false)
		//setValues({...values, [prop]: event.target.value})
		setSelectedTraining(event.target.value)
	}

	const _renderRecords = () => {
		return (
			<form
				onSubmit={async event => {
					handleSubmit(event)
				}}
			>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<FormControl
							variant="outlined"
							fullWidth
							className={classes.formControl}
						>
							<InputLabel id="demo-simple-select-outlined-label">
								workout
							</InputLabel>
							<Select
								required
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={selectedTraining}
								onChange={handleSelect('foodCategory')}
								label="workout"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>

								{trainingsList.map(({name}, index) => (
									<MenuItem value={index}>{name}</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl error={error}>
							<FormHelperText>{error}</FormHelperText>
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
							Choose your workout
						</Button>
					</Grid>
				</Grid>
			</form>
		)
	}

	return (
		<Container component="main" maxWidth="xs">
			{_renderRecords()}
		</Container>
	)
}
