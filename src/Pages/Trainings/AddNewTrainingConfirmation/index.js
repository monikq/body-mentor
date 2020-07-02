import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Container, Grid, Typography, Button} from '@material-ui/core'

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

export default ({trainingRecord, msg, confirm}) => {
	const classes = useStyles()

	const handleSubmit = async event => {
		event.preventDefault()
		//console.log('dropdown trainingsList selected', trainingsList)
		console.log('dropdown training selected', trainingRecord)
		confirm()
	}

	const _renderRecords = () => {
		return (
			<form
				onSubmit={async event => {
					handleSubmit(event)
				}}
			>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Typography
							variant="subtitle1"
							align="center"
							key={'title_confirmation'}
						>
							{msg}
						</Typography>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disableRipple
							size="small"
							color="primary"
							className={classes.margin}
						>
							OK
						</Button>
						<pre>{JSON.stringify(trainingRecord, null, 2)}</pre>
					</Grid>
				</Grid>
			</form>
		)
	}

	return (
		<Container component="main" maxWidth="xs">
			{_renderRecords()}
		</Container>
	)
}
