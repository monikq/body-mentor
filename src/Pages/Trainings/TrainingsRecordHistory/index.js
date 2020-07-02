import React from 'react'
import {Typography, Container} from '@material-ui/core'

export default ({trainingsRecordUserHistory}) => {
	const _renderExcersise = excersises => {
		//console.log(excersises)
		let previousExcersise = ''
		return excersises.map(excersise => {
			if (previousExcersise !== excersise.excersise_id) {
				previousExcersise = excersise.excersise_id
				console.log('if(previousExcersise !== excersise.excersise_id)')
				return (
					<>
						<Typography variant="body2">{excersise.name}</Typography>
						<Typography variant="body2" align="center">
							{excersise.weight}
							{'kg x '}
							{excersise.repetitions}
						</Typography>
					</>
				)
			} else {
				return (
					<Typography variant="body2" align="center">
						{excersise.weight}
						{'kg x '}
						{excersise.repetitions}
					</Typography>
				)
			}
		})
	}

	const _renderTrainingRecord = () => {
		return trainingsRecordUserHistory.map(
			({DT, created_at, id, training_id, name, excersises}, index) => (
				<>
					<Typography variant="h6" key={index}>
						{name}
					</Typography>
					<Typography variant="caption" key={index}>
						{created_at}
					</Typography>
					{_renderExcersise(excersises)}
				</>
			)
		)
	}

	const _renderRecords = () => {
		if (
			!trainingsRecordUserHistory ||
			trainingsRecordUserHistory === undefined
		) {
			return (
				<Typography gutterBottom align="center">
					Start your training and add your records!
				</Typography>
			)
		} else if (trainingsRecordUserHistory !== undefined) {
			//console.log('@@##$$ trainingRecords', trainingsRecordUserHistory)
			return (
				<>
					<Typography variant="h5" display="block" align="center">
						My weekly training record:
					</Typography>
					<Typography gutterBottom align="left">
						{_renderTrainingRecord()}
					</Typography>
				</>
			)
		}
	}

	//https://material-ui.com/components/lists/
	return (
		<Container component="main" maxWidth="xs">
			{_renderRecords()}
		</Container>
	)
}
