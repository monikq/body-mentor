import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton, Button, Link, Typography } from "@material-ui/core";
import {
  //BrowserRouter as Router,
  useHistory,
  //, useLocation
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(3, 0, 2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default (props) => {
  let history = useHistory();
  const classes = useStyles();
  console.log("Registration confirmation pops", props.msg);

  return (
    <div className={classes.paper}>
      <Typography
        className={classes.margin}
        fullWidth
        component="h1"
        variant="h5"
      >
        New user has been created.
      </Typography>

      <Link
        className={classes.margin}
        fullWidth
        variant="body2"
        onClick={() => {
          history.push("/login");
        }}
      >
        {"Sign In Now"}
      </Link>
    </div>
  );
};
