import React from 'react'
import {Typography, Container} from '@material-ui/core'

export default ({dailyRecords}) => {
	const _renderRecord = () => {
		if (!dailyRecords || dailyRecords === undefined) {
			return (
				<Typography gutterBottom align="left">
					No records from today
				</Typography>
			)
		} else if (dailyRecords !== undefined) {
			return (
				<Typography gutterBottom align="left">
					{dailyRecords.map(
						({id, DT, FoodType, created_at, kCal, kCal_100g, weight}) => (
							<p>
								[{created_at}] <strong>{kCal} kcal:</strong> {weight}g (
								{FoodType})
							</p>
						)
					)}
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
		</Container>
	)
}
