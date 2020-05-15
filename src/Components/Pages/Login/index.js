 import React, {useContext, useState, Fragment} from 'react'
 import {
    useHistory,
    useLocation
  } from "react-router-dom"
import { UserContext }  from "../../Utilities/UserContext"
import { login } from '../../Authentication'

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
      email: 'test@gmail.com',
      password: 'password',
      showPassword: false,
    })
    const [error, setError] = useState(false)

    const LogoutButton = () => ( <button
      onClick={() => {
          setUser(null)
          //history.push("/public") 
          }}
      >Logout</button>
      ) 

    const handleChange = (prop) => (event) => {
      event.preventDefault()
      setError(false) 
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
      const response = await login(values)

      if(response.success === 0) {
        setError(response.msg)
      } 
      else if(response.success === 1) {
        setUser(response.user)
        if(from.pathname !== '/')
          history.replace(from)
      } 
      else {
        console.log('error - database input is not in range of values')
      }
    }

    const _renderError = () => (
      error ? (<p  style={{color: "red"}}>{error}</p>) : ''
    )

    return (
      <Fragment>
        
        { user ? ( 
          <Fragment>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            <h2>Welcome {user['username']}</h2>
            <h3>your email is {user['user_email']}</h3>
            <LogoutButton />
          </Fragment>
          ) : (
            <div>
                <form 
                  onSubmit={
                    async (event) => { handleSubmit(event) }
                  }
             >
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
                <Button type="submit" variant="contained" disableRipple  size="large" color="primary" className={classes.margin}>
                Log in
                </Button>
                <spam> or </spam>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    history.push("/register-new-user")
                  }}
                >
                  <bold>Sign up</bold>
                </Link>
                </form>
                { _renderError() }
                
            </div>
          )}
      </Fragment>
    );
  }
