import React, {useContext, useState, Fragment} from 'react'
 import {
    BrowserRouter as Router,
    useHistory,
    useLocation
  } from "react-router-dom"
import { UserContext }  from "../../Utilities/UserContext"
import { register } from '../../Authentication'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {IconButton, Button, Link} from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));


export default () => {
    const classes = useStyles()
    const { user, setUser } = useContext(UserContext)  
    let history = useHistory()
    let location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } }

    const [values, setValues] = useState({
      email: 'test11111@gmail.com',
      password: 'password',
      username: 'DeleteMen',
      showPassword: false
    })
    const [error, setError] = useState(false)
    const [confirmation, setConfirmation] = useState(false)

    const LogoutButton = () => ( <button
      onClick={() => {
          setUser(null)
          history.push("/public") 
          }}
      >Logout</button>
      ) 
    
    const handleChange = (prop) => (event) => {
      event.preventDefault()
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    
/*   const _renderError = () => {
    error ? ( <p>{error}</p>) : (<p>{confirmation}</p>)
  } */

    return (
      <Fragment>
        <h1>Create new account</h1>
        <p>You must log in to view the page at {from.pathname}</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        { user ? ( 
            <LogoutButton />
          ) : (
            <div>
              <h2>Login user.</h2>
                <form 
                  onSubmit={
                    async (event) => {
                    event.preventDefault()

                    setError(false) 
                    setConfirmation(false)

                    const response = await register(values)
                    console.log(response)
                    
                    //validation function
                    if(response.success === 0){
                      console.log(response.success, " and ", response.msg)
                      setError(response.msg)
                    } else {
                      setConfirmation(response.msg)
                    }
                    //setUser(response.user) //let user to log in and save password -> go through process once
                    //history.replace(from) //go to login page
                  }}
             >
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput 
                  required
                  id="component-outlined" 
                  type="text" value={values.username} 
                  onChange={handleChange('username')} 
                  label="Name" 
                  />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="component-outlined">Email</InputLabel>
                <OutlinedInput 
                  required
                  id="component-outlined" 
                  type="email" value={values.email} 
                  onChange={handleChange('email')} 
                  label="Email" 
                  />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  min="6" max="100"
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
                <br />
                <Button type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
                Create new account
                </Button>
                
                </form>

                { error ? (<p>{error}</p>) : (<p>{confirmation}</p>)}
                
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    history.push("/login")
                  }}
                >
                  Login
                </Link>
            </div>
          )}
      </Fragment>
    );
  }