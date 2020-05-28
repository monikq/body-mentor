import React, {useState, useMemo, useContext, useEffect} from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import Home from './Pages/Home'
import ProtectedPage from './Pages/ProtectedPage'
import Login from './Pages/Login'
import {UserContext} from './Utilities/UserContext'
import {NotFound} from './Errors'
import Layout from './Layout'
import Trainings from './Trainings'
import Register from './Pages/Register'
import RegisterConfirmation from './Pages/Register/RegisterConfirmation'
import Calories from '../Pages/Calories'

export default function () {
	const [user, setUser] = useState(() => fetchUserFromSessionStorage())
	const providerValue = useMemo(() => ({user: user, setUser: setUser}), [
		user,
		setUser,
	])

	function fetchUserFromSessionStorage() {
		if (sessionStorage.getItem('userData')) {
			let userSession = JSON.parse(sessionStorage.getItem('userData'))

			console.log('checkUserSession: true', userSession)
			return userSession
		} else {
			console.log('checkUserSession: false')
			return false
		}
	}

	//move links outside of this function
	const navLinks = [
		{
			id: 1,
			text: 'Home',
			path: '/',
		},
		{
			id: 2,
			text: 'Calories',
			path: '/calories',
		},
		{
			id: 3,
			text: 'Body',
			path: '/body',
		},
		{
			id: 4,
			text: 'Trainings',
			path: '/trainings',
		},

		{
			id: 5,
			text: 'Sleep',
			path: '/sleep',
		},
		{
			id: 6,
			text: 'Hydration',
			path: '/hydration',
		},
		{
			id: 7,
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
						<Route path="/public">
							<Home />
						</Route>
						<PrivateRoute path="/calories">
							<Calories />
						</PrivateRoute>
						<PrivateRoute path="/body">
							<ProtectedPage />{' '}
						</PrivateRoute>
						<PrivateRoute
							path="/trainings"
							component={props => <Trainings {...props} />}
						/>
						{/* this is not protecting page while no user - no redirect
						 * when using render nothing is showing up -> component is not opening [white page] */}
						<PrivateRoute path="/sleep">
							<ProtectedPage />
						</PrivateRoute>
						<PrivateRoute path="/hydration">
							<ProtectedPage />
						</PrivateRoute>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/register-new-user">
							<Register />
						</Route>
						<Route path="/register-confirmation">
							<RegisterConfirmation />
						</Route>
						/>
						{/* <Route
							path="/trainings"
							render={props => <Trainings {...props} trainings={trainings} />}
						/> 
						<PrivateRoute
							path="/new-training"
							render={props => <Trainings {...props} trainings={trainings} />}
						/>*/}
						<Route component={NotFound} />
					</Switch>
				</Layout>
			</UserContext.Provider>
		</Router>
	)
}

function PrivateRoute({children, ...rest}) {
	const {user} = useContext(UserContext)

	return (
		<Route
			{...rest}
			render={({location}) =>
				user ? (
					children
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
