import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
//import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { MenuList, MenuItem, Button } from '@material-ui/core'
import { Link, withRouter, useHistory } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    /* [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    }, */
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

function Layout(props) {
  const { container, children, /* trainings, */ navLinks, location: {pathname}, user } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  let history = useHistory()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
        <Hidden /* sxDown */ >
            <div className={classes.toolbar} />   
        </Hidden>
      
        <Divider />
        <List>
            <MenuList>
            {navLinks.map(({text, path}) => (
              <MenuItem component={Link} to={path} selected={{path} === pathname}>
                    {text}
                </MenuItem>
            ))} 
            </MenuList>
        </List>
        <Divider />
    </div>
  )

  const _renderHeaderCredentials = () => (
    user ? ('Hi ' + user.username
            ) : (

              /*<Link variant="contained" size="small" color="primary" className={classes.margin}
              onClick={() => {
                history.push("/login")
              }}
              >
                Log in
                </Link>*/

               <Button
                variant="contained" size="small" color="primary" className={classes.margin}
                style = {{float: "right"}}
                  onClick={() => {
                    history.push("/login")
                  }}
                >
                  Log in
                </Button> 
            )
  )


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flex: 1 }}>
            { _renderHeaderCredentials() }
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
       
      </main>
    </div>
  )
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
}

export default withRouter (Layout)

//withStyles(styles) Layout
//withRouter(Layout) //we need it for navigation selected button to check our pathname and Layout is outside of 
// App.js so we need to use withRouter to have location, history and match in this component
/* export default compose (
    withStyles(styles),
    withRouter
) 
//in App.js > import { compose } from 'recompose'
//add it as dependency for realibility > package.json test
yarn add decompose
*/




/* const drawer = (
  <div>
      <Hidden /* sxDown */ /*>
          <div className={classes.toolbar} />   
      </Hidden>
    
      <Divider />
      <List>
          <MenuList>
          {navLinks.map(({text, path}) => (
            <MenuItem component={Link} to={path} selected={{path} === pathname}>
                  {text}
              </MenuItem>
          ))}

               <MenuItem component={Link} to="/" selected={'/' === pathname}>
                  Home
              </MenuItem>
              <MenuItem component={Link} to="/public" selected={'/public' === pathname}>
                  Public
              </MenuItem>
              <MenuItem component={Link} to="/protected" selected={'/protected' === pathname}>
                Protected
              </MenuItem>
              <MenuItem component={Link} to="/login" selected={'/login' === pathname}>
               Login
              </MenuItem>
              <MenuItem component={Link} to="new-training"  selected={'/new-training' === pathname}>
                  Training
              </MenuItem>
              <MenuList>
                  {trainings.map(({ id, name }) => {
                      console.log("pathname", pathname)
                      console.log("props", props)
                      const to = `/new-training/${id}`
                      return <MenuItem 
                          to={to}
                          key={id} 
                          className={classes.nested} 
                          component={Link} 
                          selected={to === pathname}
                          >
                              {name}
                          </MenuItem>
                  })}
              </MenuList>
              
          </MenuList>
           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
          </ListItem>
          ))} 
      </List>
      <Divider />
      <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
          </ListItem>
          ))}
      </List> 
  </div>
) */