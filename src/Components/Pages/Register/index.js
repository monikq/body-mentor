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

/*     const handleSubmit = (event) => {
      console.log("submit: email:", values.email, "pass", values.password)
      event.preventDefault();
    }; */

    
  const _renderError = () => {
    // {if(error){<p>Error! {error}</p>}}
    return <p>Error from error message:  {error}</p>
  }

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
                  onSubmit={async (event) => {
                    event.preventDefault()

                    setError(false) 
                    setConfirmation(false)

                    const response = await register(values)
                    console.log(response)
                    
                    //validation function
                    if(response.success == 0){
                      console.log(response.success, " and ", response.msg)
                      setError(response.msg)
                    } else {
                      setConfirmation(response.msg)
                    }
                    setUser(user)
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

                {<p>{/* Error from error message:   */}{error}</p>}

                {<p>{/* Confirmation and login link > confirmation component:   */}{confirmation}</p>}
                
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