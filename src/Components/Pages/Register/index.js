import React, {useContext, useState, Fragment} from 'react'
 import {
    //BrowserRouter as Router,
    useHistory
    //, useLocation
  } from "react-router-dom"
import { UserContext }  from "../../Utilities/UserContext"
import { register } from '../../Authentication'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {IconButton, Button, Link, Typography} from '@material-ui/core';
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

//error and confirmation style for errors in registration and login and future tabs > ?? global / style hooks?


export default () => {
    const classes = useStyles()
    const { user, setUser } = useContext(UserContext)  
    let history = useHistory()
    //let location = useLocation()
    //let { from } = location.state || { from: { pathname: "/" } }  //history.replace(from) //go use this function

    const [values, setValues] = useState({
      username: '',
      email: '',
      password: '',
      showPassword: false
    })
    const [error, setError] = useState(false)
    //const [confirmation, setConfirmation] = useState(false)

    //a lot of login, log out and sign in buttons on both pages > 3 pages
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

    const handleSubmit = async (event) => {
      event.preventDefault()
      setError(false) 
      //setConfirmation(false)
      const response = await register(values)
      
      //db response validation
      if(response.success === 0){
        console.log(response.success, " and ", response.msg)
        setError(response.msg)
      } else {
        //setConfirmation(response.msg)
      }
      //setUser(response.user) //if you want to login user
      //history.replace(from) //go to saved page
    }

    const _renderError = () => (
      error ? (<p  style={{color: "red"}}>{error}</p>) : (<p style={{color: "white"}}> . </p>)
    )
      
    return (
      <Fragment>
        { user ? ( 
          <Fragment>
            {/* this is shared between login and register page > component? */}
              <pre>{JSON.stringify(user, null, 2)}</pre>
              <h2>User {user['username']}</h2>
              <LogoutButton />
          </Fragment>
          ) : (
            <div>
              <h2>This will take only 15s</h2>
                <form
                  onSubmit={
                    async (event) => { handleSubmit(event) }
                  }
             >
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput 
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
                <br />
                { _renderError() }
                
               
                <Button type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
                Sign up
                </Button>
                <Typography> or </Typography>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    history.push("/login")
                  }}
                >
                  Log in
                </Link>
                </form>
                
                
            </div>
          )}
      </Fragment>
    );
  }