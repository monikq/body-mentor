import React, {useContext} from 'react'
import {UserContext} from '../../Components/Utilities/UserContext'
import {Grid} from '@material-ui/core'

export default () => {
	const {user} = useContext(UserContext)

	return (
		<Grid container>
			<Grid item xs={false} sm={1} />
			<Grid item xs={12} sm={10}>
				<div>
					<h2>What makes us tick?</h2>
					{user ? <p>{user.username}</p> : ''}
					<p>
						Would it be a ridiculous idea that our daily choices impact Earth?
					</p>

					<p>
						Did you consider how our lifestyle is changing the environment in
						our World?
					</p>

					<p>
						What are the consequences if we will continue to live this lifes?
					</p>
					<p>
						Observe how many people live in your neighborhood and multiply this
						effect, imagine all the food, trash, activities, electricity, and
						water that is crucial for everyone to be happy.
					</p>
					<p>
						Make sure to find out about this lifestyle how wasteful routines
						create a huge snowball over your lifetime, creates tones of trash
						for every one of us. Imagine these tones and multiply it for every
						person in your city, country, and then the continent. Imagine those
						mountains of trash. How awful and stinky it has to be? How many new
						species will find out their home there? Use your extreme imagination
						and figure out how many years of this lifestyle will create
						Himalinen trash mountain?
					</p>
					<p>
						Here we are trying to help to live a abondant lifestyle with just
						right amount of important stuff.
					</p>
					<p>Happiness is not at all about overusing ...</p>

					{/* {user? ( <pre>{JSON.stringify(user, null, 2)}</pre>):(<Login />)} */}
				</div>
			</Grid>
			<Grid item xs={false} sm={1} />
		</Grid>
	)
}
