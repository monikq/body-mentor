import React, {useContext, useState, Fragment} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
	FormHelperText,
	Button,
	FormControl,
	Typography,
	InputLabel,
	OutlinedInput,
	Container,
	MenuItem,
	Select,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import {UserContext} from '../../Components/Utilities/UserContext'
import {
	addCalories,
	fetchTotalCaloriesTodayForUserId,
	fetchCaloriesRecordTodayByUserID,
} from '../../Components/Calories'

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

export default () => {
	const classes = useStyles()

	/* const [calories, setCalories] = useState()

	function UpdateCaloriesData(formData) {
		//setTotalCaloriesData
		console.log('UpdateCaloriesData(formData)', formData)
		setCalories(formData)
		console.log('PARENT calories:', calories)
		//const response = await register(values); //we need values
		//ready to upate database with these values >> localhost albo testing
	} */

	/* change total daily and calories only after submit will add new calories record */

	// get data update context ? gdzie on powinien być? state czy context? state? chyba
	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={false} sm={1} />
				<Grid item xs={12} sm={10}>
					<TotalDailyCaloriesHeader user />
					<AddNewCaloriesRecordForm /* updateFormData={UpdateCaloriesData}  */
					/>
					<DailyCaloriesRecord />
				</Grid>
				<Grid item xs={false} sm={1} />
			</Grid>
		</div>
	)
}

const TotalDailyCaloriesHeader = () => {
	const {user} = useContext(UserContext)
	const [totalDailyCalories, setTotalDailyCalories] = useState('0')
	const [totalDailyGrams, setTotalDailyGrams] = useState('0')
	//change only when new calories has been added

	if (!user) {
		console.log('error user not available')
		setTotalDailyCalories('login first')
	}

	const getTotalDailyCalories = async () => {
		const response = await fetchTotalCaloriesTodayForUserId(user.user_id)
		//console.log('total daily calories - response:', response)
		if (response.success === 0 || !response.success) {
			setTotalDailyCalories('--')
			setTotalDailyGrams('--')
		} else {
			setTotalDailyCalories(response.data.total_kcal_today)
			setTotalDailyGrams(response.data.total_grams_today)
		}
	}

	//REFACTORING -:> change only if new record has been added > hooks
	getTotalDailyCalories()

	return (
		<Container component="main" maxWidth="xs">
			<Typography variant="h5" display="block" align="center">
				Today you ate:
			</Typography>
			<Typography variant="h5" gutterBottom align="center" color="secondary">
				{totalDailyCalories} kcal
			</Typography>
			<Typography variant="body1" gutterBottom align="center" color="secondary">
				{totalDailyGrams} grams
			</Typography>
		</Container>
	)
}

const AddNewCaloriesRecordForm = () => {
	const {user} = useContext(UserContext)
	const classes = useStyles()
	const [values, setValues] = useState({
		kCal_100g: 0,
		weight_grams: 0,
		foodCategory: '',
	})
	const [error, setError] = useState(false)

	const handleChange = prop => event => {
		event.preventDefault()
		setError(false)
		setValues({...values, [prop]: event.target.value})
	}

	const handleSubmit = async event => {
		event.preventDefault()

		//console.log('!!!!!!! 1 values', values)

		const response = await addCalories(user.user_id, values)
		//console.log('!!!!!!!!handle Submit new kCal record response:', response)

		//console.log('!!!!!!! 3 total daily calories - response:', response)
		if (response.success) {
			setError(response.msg)
		} else setError('Database response not recognized')

		//console.log('call if response success==1 > to parent UpdateCaloriesData();')
		/*
		UpdateCaloriesData() > call upstairt
		*
		 *setError(false);
    const response = await register(values);

    if (response.success === 0) {
      setError(response.msg);
    } else {
      setConfirmation(response.msg);
    }
		 */
		//https://material-ui.com/components/snackbars/
		//enqueueSnackbar('This is a success message!', { variant }); -- czy będą 2 miejsca z confirmacją? to jest z góry widziane
	}

	return (
		<Container component="main" maxWidth="xs">
			<Typography variant="h5" align="center">
				Add new calories record
			</Typography>
			<form
				onSubmit={async event => {
					handleSubmit(event)
				}}
			>
				<FormControl
					className={clsx(classes.margin)}
					variant="outlined"
					fullWidth
				>
					<InputLabel htmlFor="component-outlined">weight [grams]</InputLabel>
					<OutlinedInput
						required
						min="1"
						placeholder="grams"
						id="weight_grams"
						label="weight in grams"
						type="number"
						value={values.weight_grams}
						onChange={handleChange('weight_grams')}
					/>
				</FormControl>
				<FormControl
					className={clsx(classes.margin)}
					variant="outlined"
					fullWidth
				>
					<InputLabel htmlFor="component-outlined">kCal / 100 grams</InputLabel>
					<OutlinedInput
						required
						min="1"
						placeholder="kcal"
						id="kCal_100g"
						label="kCal / 100 grams"
						type="number"
						value={values.kCal_100g}
						onChange={handleChange('kCal_100g')}
					/>
				</FormControl>
				<FormControl
					variant="outlined"
					fullWidth
					className={classes.formControl}
				>
					<InputLabel id="demo-simple-select-outlined-label">
						category
					</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={values.foodCategory}
						onChange={handleChange}
						label="category"
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'Grains'}>Grains</MenuItem>
						<MenuItem value={'Meat'}>Meat</MenuItem>
						<MenuItem value={'CVegies'}>Vegies</MenuItem>
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
					Add record
				</Button>
			</form>
		</Container>
	)
}
const DailyCaloriesRecord = () => {
	const [dailyRecords, setDailyRecords] = useState()

	const {user} = useContext(UserContext)

	//console.log('pages user context', user)

	const getRecordsDailyCalories = async () => {
		//console.log('TEST - (Calories) user_id', user.user_id)
		const response = await fetchCaloriesRecordTodayByUserID(user.user_id)
		//console.log('TEST - (Calories) response', response)

		if (response.success === 0) {
			setDailyRecords('---')
		} else {
			setDailyRecords(response.data)
		}
		/*console.log(
			'TEST - if totalDailyCalories is number and it gets proper value:',
			dailyRecords
		) */
	} //setTotalCaloriesData asynch > fetch from server
	/**/
	//change only if new record has been added > hooks
	getRecordsDailyCalories()

	//console.log('TEST > if dailyRecords are not unudentified ', dailyRecords)

	const _renderRecord = () => {
		if (!dailyRecords) {
			console.log('no daily records')

			return (
				<Typography gutterBottom align="left">
					`add new record`
				</Typography>
			)
		} else {
			console.log('daily records', dailyRecords)
			return (
				<Typography gutterBottom align="left">
					{/* {dailyRecords.map(
						({DT, FoodType, created_at, kCal, kCal_100g, weight}) => (
							<p>hello</p>
						)
					)} */}
					narazie nic tutaj nie ma - dailyRecords musi być tablicą
				</Typography>
			)
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<Typography variant="h5" display="block" align="center">
				Today record details:
			</Typography>
			{_renderRecord()}
			<Typography gutterBottom align="left">
				nieprogramistycznie hele
			</Typography>
		</Container>
	)
}
//componenty
/*<div>
			<h2>Calories Tracker</h2>
			<p>Your secret details.</p>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
 * CaloriesForm
 * CaloriesPrefab
 * CaloriesHeader
 *   TotalDailyCalories
 *   DietProductFoodCategoryDistribution ... */
