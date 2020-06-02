import React from 'react'
import {Typography, Container} from '@material-ui/core'

export default ({dailyRecords}) => {
	const _renderRecords = () => {
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
						({
							id,
							DT,
							FoodType,
							created_at,
							kCal,
							kCal_100g,
							weight,
							index,
						}) => (
							<Typography key={index}>
								[{created_at}] <strong>{kCal} kcal:</strong> {weight}g (
								{FoodType})
							</Typography>
						)
					)}
				</Typography>
			)
		}
	}

	//https://material-ui.com/components/lists/
	return (
		<Container component="main" maxWidth="xs">
			<Typography variant="h5" display="block" align="center">
				Today record details:
			</Typography>
			{_renderRecords()}
		</Container>
	)
}
