 import React, {useContext, useState, Fragment} from 'react'
/*  import axios from 'axios'; */
 import {
    BrowserRouter as Router,
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

    return (
      <Fragment>
        <h1>User Profile</h1>
        <p>You must log in to view the page at {from.pathname}</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        { user ? ( 
            <LogoutButton />
          ) : (
            <div>
              <h2>Login user.</h2>
                <form 
                  onSubmit={async (event) => {
                    event.preventDefault()
                    //console.log("walidacja, if password and email exist jeśli nie wyświetl error")
                    const user = await login(values)
                    {user ? (console.log("user exist", user)) : (console.log("NO user, try again", user))}
                    //console.log("tutaj sprawdz czy user który przyszedł istnieje i zapisz jeśli tak, albo wyślij error jeśli nie", user)
                    setUser(user)
                    //console.log("user!!! send him back to from.pathname (push)", user)
                    history.replace(from)
                  }}
             >
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="component-outlined">Email</InputLabel>
                <OutlinedInput 
                  id="component-outlined" 
                  type="email" value={values.email} 
                  onChange={handleChange('email')} 
                  label="Email" 
                  />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
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
                <Button type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
                Login
                </Button>
                
                </form>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.")
                    history.push("/register-new-user")
                  }}
                >
                  Sign in
                </Link>
            </div>
          )}
      </Fragment>
    );
  }


  //login coordinator
  //login form
  //login button
  //login fetch
  //login 
  //...sign in


      /*handleSubmit = (event) => {
      /* const { email, password } = this.state;
      //console.log("CODE REFACTORNING - move database connection outside - when? when you deal with registration and password check for login")
  
      axios.post('http://www.andysekula.com/server/login.php',
        {
          //user: {
            email: email,
            password: password
          //}
        }/*,
        { withCredentials: true }*/
      /*)
        .then(response => {
          console.log("response from login.php with msg:", response.data.msg);
          if (response.data.success === 1) {
            this.setState({
              user: response.data.user.reverse()
            });
            //console.log("CHANGE USER DATA TO PROTECT PASSWORD ", this.state.user);
            this.setState({ redirectToReferrer: true });
            
            //console.log("user log in and ready to rediect USE this.props.handleSuccessfulAuth(this.state.user)");
            sessionStorage.setItem('userData', JSON.stringify(this.state.user));
  
            //console.log(" ---! login sessionStorage.getItem('userData') ", sessionStorage.getItem('userData'));
  
            this.props.handleSuccessfulAuth(this.state.user[0]);
          }
        })
        .catch(error => {
          console.log("login error ", error);
        })
   
      event.preventDefault();
      console.log("submit function ");
    } 

    )*/