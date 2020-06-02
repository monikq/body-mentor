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
	MenuItem,
	Select,
} from '@material-ui/core'
import clsx from 'clsx'

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

export default props => {
	const classes = useStyles()
	const [values, setValues] = useState({
		kCal_100g: '',
		weight_grams: '',
		foodCategory: '',
	})
	const [error, setError] = useState(false)
	const [confirmation, setConfirmation] = useState(false)
	const foodTypes = [
		{
			name: 'Non-Starchy Vegetables',
			proteinProcentage: '3',
			carbsProcentage: '94',
			fatProcentage: '3',
		},
		{
			name: 'Starchy Vegetables',
			proteinProcentage: '5',
			carbsProcentage: '90',
			fatProcentage: '5',
		},
		{
			name: 'Grains',
			proteinProcentage: '5',
			carbsProcentage: '90',
			fatProcentage: '5',
		},
		{
			name: 'Legumes and Beans',
			proteinProcentage: '1',
			carbsProcentage: '98',
			fatProcentage: '1',
		},
		{
			name: 'Fruits',
			proteinProcentage: '1',
			carbsProcentage: '98',
			fatProcentage: '1',
		},

		{
			name: 'Nuts and Seeds',
			proteinProcentage: '3',
			carbsProcentage: '94',
			fatProcentage: '3',
		},
		{
			name: 'Fats and Oils',
			proteinProcentage: '5',
			carbsProcentage: '90',
			fatProcentage: '5',
		},
		{
			name: 'Dairy',
			proteinProcentage: '5',
			carbsProcentage: '90',
			fatProcentage: '5',
		},
		{
			name: 'Eggs',
			proteinProcentage: '5',
			carbsProcentage: '90',
			fatProcentage: '5',
		},
		{
			name: 'Fish & seafood',
			proteinProcentage: '5',
			carbsProcentage: '90',
			fatProcentage: '5',
		},
		{
			name: 'Poultry',
			proteinProcentage: '5',
			carbsProcentage: '90',
			fatProcentage: '5',
		},
		{
			name: 'Red meat',
			proteinProcentage: '5',
			carbsProcentage: '90',
			fatProcentage: '5',
		},
		{
			name: 'Sweet',
			proteinProcentage: '5',
			carbsProcentage: '90',
			fatProcentage: '5',
		},
		{
			name: 'Other',
			proteinProcentage: '0',
			carbsProcentage: '0',
			fatProcentage: '0',
		},
	]
	const handleChange = prop => event => {
		event.preventDefault()
		setError(false)
		setConfirmation(false)
		setValues({...values, [prop]: event.target.value})
	}

	const handleSubmit = async event => {
		event.preventDefault()

		const response = await props.updateFormData(values)

		if (response.confirmation) {
			setConfirmation(response.confirmation)
			setValues({
				kCal_100g: '',
				weight_grams: '',
				foodCategory: 'not specified',
			})
		} else if (response.error) {
			setError(response.error)
		}
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
						required
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={values.foodCategory}
						onChange={handleChange('foodCategory')}
						label="category"
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{foodTypes.map(
							({name, proteinProcentage, carbsProcentage, fatProcentage}) => (
								<MenuItem value={name}>{name}</MenuItem>
							)
						)}
					</Select>
				</FormControl>
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
			</form>
		</Container>
	)
}
