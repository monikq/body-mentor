import React from 'react'
import {Typography, Container} from '@material-ui/core'

export default ({total_kcal_today, total_grams_today}) => (
	<Container component="main" maxWidth="xs">
		<Typography variant="h5" display="block" align="center">
			Today you ate:
		</Typography>
		<Typography variant="h5" gutterBottom align="center" color="secondary">
			{total_kcal_today} kcal
		</Typography>
		<Typography variant="body1" gutterBottom align="center" color="secondary">
			{total_grams_today} grams
		</Typography>
	</Container>
)
