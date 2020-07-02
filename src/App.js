import React, {useState, useMemo, useContext, useEffect} from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import Home from './Pages/Home'
import ProtectedPage from './Pages/ProtectedPage'
import Login from './Pages/Authentication/Login'
import {UserContext} from './Components/Utilities/UserContext'
import {NotFound} from './Components/Errors'
import Layout from './Components/Layout'
import Trainings from './Pages/Trainings'
import Register from './Pages/Authentication/Register'
import RegisterConfirmation from './Pages/Authentication/Register/RegisterConfirmation'
import Calories from './Pages/Calories'

export default function () {
	const [user, setUser] = useState(() => fetchUserFromSessionStorage())
	const providerValue = useMemo(() => ({user: user, setUser: setUser}), [
		user,
		setUser,
	])

	function fetchUserFromSessionStorage() {
		if (sessionStorage.getItem('userData')) {
			let userSession = JSON.parse(sessionStorage.getItem('userData'))

			//console.log('checkUserSession: true', userSession)
			return userSession
		} else {
			//console.log('checkUserSession: false')
			return false
		}
	}

	//move links outside of this function
	const navLinks = [
		{
			text: 'Home',
			path: '/',
		},
		{
			text: 'Calories',
			path: '/calories',
		},

		{
			text: 'Trainings',
			path: '/trainings',
		},
		{
			text: 'Body',
			path: '/body',
		},
		/*
		{
			text: 'Sleep',
			path: '/sleep',
		},*/
		{
			text: 'About',
			path: '/About',
		},
		{
			text: 'Login',
			path: '/login',
		},
	]

	useEffect(() => {
		document.title = 'body mentor'
	}, [])

	return (
		<Router>
			<UserContext.Provider value={providerValue}>
				<Layout navLinks={navLinks} user={user}>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/register-new-user">
							<Register />
						</Route>
						<Route path="/register-confirmation">
							<RegisterConfirmation />
						</Route>
						<Route exact path="/About" render={() => <div>About me</div>} />

						<PrivateRoute path="/calories">{`Calories`}</PrivateRoute>
						<PrivateRoute path="/body">{'ProtectedPage'}</PrivateRoute>
						<PrivateRoute path="/trainings">{'Trainings'}</PrivateRoute>

						<Route component={NotFound} />
					</Switch>
				</Layout>
			</UserContext.Provider>
		</Router>
	)
}

function PrivateRoute({children, ...rest}) {
	const {user} = useContext(UserContext)
	const _renderSwitch = () => {
		if (!children || children === undefined) {
			return <p>Loading...</p>
		} else if (children !== undefined) {
			switch (children) {
				case 'Trainings':
					return <Trainings {...rest} />
				case 'Calories':
					return <Calories {...rest} />
				case 'ProtectedPage':
					return <ProtectedPage {...rest} />
				case 'to use':
					return <Calories {...rest} />
				default:
					return <Home />
			}
		}
	}

	return (
		<Route
			{...rest}
			render={({location}) =>
				user ? (
					_renderSwitch()
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: {from: location},
						}}
					/>
				)
			}
		/>
	)
}
