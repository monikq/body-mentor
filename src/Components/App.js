import React, { useState, useMemo, useContext } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Home from "./Pages/Home"
import ProtectedPage from "./Pages/ProtectedPage"
import Login from "./Pages/Login"
import { UserContext } from "./Utilities/UserContext"
import { NotFound } from "./Errors"
import Layout from "./Layout"
import Trainings from "./Trainings"
import Register from "./Pages/Register"


export default function () {
  const [user, setUser] = useState()
  //const [trainings, setTrainings] = useState()
  const providerValue = useMemo(() => ({user: user, setUser: setUser}), [user, setUser])

  const trainings = [
    { 
      id: "111234",
      name: 'Bary Trening',

    }
  ]

  const navLinks = [
    { 
      id: 1,
      text: "Home",
      path: '/'
    },
    { 
      id: 2,
      text: "Body",
      path: '/body'
    },
    { 
      id: 3,
      text: "Trainings",
      path: '/trainings'
    },
    { 
      id: 4,
      text: "New Training",
      path: '/new-training'
    },
    { 
      id: 5,
      text: "Sleep",
      path: '/sleep'
    },
    { 
      id: 6,
      text: "Shit",
      path: '/shit'
    },
    { 
      id: 7,
      text: "Login",
      path: '/login'
    }
  ]


  return (
    <Router>
      <div>
        <UserContext.Provider value={providerValue}> 
          <Layout  trainings={trainings} navLinks = {navLinks} user={user}>
            <Switch>
              <Route exact path="/">
                  <Home />
                </Route>
                <PrivateRoute path="/body" >
                  <ProtectedPage />
                </PrivateRoute>
                <PrivateRoute path="/sleep" >
                  <ProtectedPage />
                </PrivateRoute>
                {/* <PrivateRoute path="/sleep" render ={ () => <div>Sleep</div>} /> */}
                <Route path="/public">
                  <Home />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register-new-user">
                  <Register />
                </Route>
                <PrivateRoute path="/shit">
                  <ProtectedPage />
                </PrivateRoute>
                <PrivateRoute path="/trainings" render={
                  props => <Trainings {...props} trainings={trainings} />
                } />
                <PrivateRoute path="/new-training" render={
                  props => <Trainings {...props} trainings={trainings} />
                } />

                <Route component={ NotFound } />
            </Switch>
          </Layout>
        </UserContext.Provider> 
      </div>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(UserContext) 
  return (
    <Route
      {...rest}
      render={({ location }) =>
      user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


