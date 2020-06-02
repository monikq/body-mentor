import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx'
import {IconButton, Button, Link, Typography} from '@material-ui/core'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import FormHelperText from '@material-ui/core/FormHelperText'
import {useHistory} from 'react-router-dom'
//custom components
import {register} from '../../Authentication'
import RegisterConfirmation from './RegisterConfirmation'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	margin: {
		margin: theme.spacing(3, 0, 2),
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
}))

export default () => {
	const classes = useStyles()
	let history = useHistory()
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		showPassword: false,
	})
	const [error, setError] = useState(false)
	const [confirmation, setConfirmation] = useState(false)

	const handleChange = prop => event => {
		event.preventDefault()
		setValues({...values, [prop]: event.target.value})
	}

	const handleClickShowPassword = () => {
		setValues({...values, showPassword: !values.showPassword})
	}

	const handleMouseDownPassword = event => {
		event.preventDefault()
	}

	const handleSubmit = async event => {
		event.preventDefault()
		setError(false)
		const response = await register(values)

		if (response.success === 0) {
			setError(response.msg)
		} else {
			setConfirmation(response.msg)
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			{confirmation ? (
				<RegisterConfirmation msg={confirmation} />
			) : (
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Sign up
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
							<InputLabel htmlFor="component-outlined">Name</InputLabel>
							<OutlinedInput
								id="component-outlined"
								type="text"
								value={values.username}
								onChange={handleChange('username')}
								label="Name"
							/>
						</FormControl>
						<FormControl
							className={clsx(classes.margin)}
							variant="outlined"
							fullWidth
						>
							<InputLabel htmlFor="component-outlined">Email</InputLabel>
							<OutlinedInput
								required
								id="component-outlined"
								type="email"
								value={values.email}
								onChange={handleChange('email')}
								label="Email"
							/>
						</FormControl>
						<FormControl
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							fullWidth
						>
							<InputLabel htmlFor="outlined-adornment-password">
								Password
							</InputLabel>
							<OutlinedInput
								required
								id="outlined-adornment-password"
								type={values.showPassword ? 'text' : 'password'}
								value={values.password}
								min="6"
								max="100"
								onChange={handleChange('password')}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{values.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								labelWidth={70}
							/>
						</FormControl>
						<FormControl error={error}>
							<FormHelperText>{error}</FormHelperText>
						</FormControl>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disableRipple
							size="large"
							color="primary"
							className={classes.margin}
						>
							Sign up
						</Button>
						<Grid container>
							<Grid item xs />
							<Grid item>
								<Link
									variant="body2"
									onClick={() => {
										history.push('/login')
									}}
								>
									{'Already have an account? Sign In'}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			)}
		</Container>
	)
}
