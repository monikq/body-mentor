import React, {useContext, useState, Fragment} from 'react'
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
import {useHistory, useLocation} from 'react-router-dom'
import {UserContext} from '../../Utilities/UserContext'

import {login} from '../../Authentication'

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
	const {user, setUser} = useContext(UserContext)
	let history = useHistory()
	let location = useLocation()
	let {from} = location.state || {from: {pathname: '/'}}

	const [values, setValues] = useState({
		email: 'test@gmail.com', //bob@bob.pl
		password: 'password',
		showPassword: false,
	})
	const [error, setError] = useState(false)

	const LogoutButton = () => (
		<button
			onClick={() => {
				setUser(null)
				sessionStorage.removeItem('userData')
				//history.push("/public")
			}}
		>
			Logout
		</button>
	)

	const handleChange = prop => event => {
		event.preventDefault()
		setError(false)
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
		const response = await login(values)

		if (response.success === 0) {
			setError(response.msg)
		} else if (response.success === 1) {
			setUser(response.user)
			sessionStorage.setItem('userData', JSON.stringify(response.user))
			console.log(
				"session (<Redirect to={'/home'} />);",
				JSON.stringify(user),
				'response user',
				response.user
			)
			if (from.pathname !== '/') history.replace(from)
		} else {
			console.log('error - database input is not in range of values')
		}
	}

	/* 
    if (sessionStorage.getItem('userData')) {
			//return (<Redirect to={'/home'} />);
			console.log("session (<Redirect to={'/home'} />);")
    }
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    sessionStorage.setItem('userData', JSON.stringify(this.state.user));
    */

	return (
		<Container component="main" maxWidth="xs">
			{user ? (
				<Fragment>
					{/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
					{/* create profile page > maybe some parent to redirect pages */}
					<h2>Welcome {user['username']}</h2>
					<h3>your email is {user['user_email']}</h3>
					<LogoutButton />
				</Fragment>
			) : (
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Sign in
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
							<InputLabel htmlFor="component-outlined">Email</InputLabel>
							<OutlinedInput
								required
								id="email"
								label="email"
								type="email"
								value={values.email}
								onChange={handleChange('email')}
							/>
						</FormControl>
						<FormControl
							className={clsx(classes.margin)}
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
							Log in
						</Button>
						<Grid container>
							<Grid item xs />
							<Grid item>
								<Link
									variant="body2"
									onClick={() => {
										history.push('/register-new-user')
									}}
								>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			)}
		</Container>
	)
}
