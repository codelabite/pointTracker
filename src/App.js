import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LoadUp from "./LoadUp";
import MainCard from "./mainCard";
import RecipeReviewCard from "./again";
import Counter from "./counter";
import CustomizedTables from "./table";
import Note from "./note";
import CustomizedInputs from "./entryInput";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import PrimarySearchAppBar from "./AppBar";
import BottomAppBar from "./BottomBar";
import { BrowserRouter as Router, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  center: {
    margin: "auto",
    width: "50%",
    // border: 3px solid green,
    padding: 10,
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <Router>
      <React.Fragment>
        <CssBaseline />
        <Route path="/" exact>
          <PrimarySearchAppBar />
          <RecipeReviewCard />
          <BottomAppBar />
        </Route>

        <Route path="/add">
          <PrimarySearchAppBar />
          <Container>
            {""}
            <div className={classes.center}>
              <CustomizedInputs />
            </div>
          </Container>

          <BottomAppBar />
        </Route>

        <Route path="/setting">
          <PrimarySearchAppBar />
          <Container maxWidth="lg">
            <CustomizedTables />
          </Container>
          <Container maxWidth="sm">
            <Typography
              component="div"
              style={{ backgroundColor: "#transperent", height: "100px" }}
            />
          </Container>
          <BottomAppBar />
        </Route>
      </React.Fragment>
    </Router>
  );
}

{
  /*       
      <Container maxWidth="lg">
        <CustomizedTables />

        <div className={classes.center}>
          <CustomizedInputs />
        </div>
      </Container>
      {/* <CustomizedTables />
      {""} */
}
{
}
{
  /* <RecipeReviewCard /> */
}
