import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Webcam from "../components/Webcam";

import HabitModal from "../components/HabitModal";

import Checkbox from "../components/Checkbox";
import Timed from "../components/Timed";
import StrictTimed from "../components/StrictTimed";

import axios from "axios";

// const habits = [
//   {
//     title: "Drink water",
//     trigger: "bottle",
//     type: "checkbox",
//   },
//   {
//     title: "Brush teeth",
//     trigger: "toothbrush",
//     type: "timed",
//     duration: new Date().setHours(0, 1, 0, 0),
//   },
//   {
//     title: "Brush teeth",
//     trigger: "toothbrush",
//     type: "strict_timed",
//     duration: new Date(),
//   },
// ];

export default function Home() {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  const [detections, setDetections] = useState([]);

  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE1YzNkODU1ZWViZTEzYTAwMGY1MjIiLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJCYXJhc2EiLCJlbWFpbCI6InBiQGVtYWlsLmNvbSIsImlhdCI6MTYxMjA0NzQxMX0.Rbx8UktbVnmUkfJi0AR3sdoZkbh5s8rZEZ2UezTsIPk";

    axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.get["Authorization"] = "Bearer " + token;

    axios
      .get("http://localhost:5000/api/routines/gethabits", {
        params: {
          id: "6015c1fadfa1e55a4428fdb6",
        },
      })
      .then(res => {
        console.log(res.data.routines[0].habits);
        setHabits(res.data.routines[0].habits);
      });
  }, []);

  const handleSave = habit => {
    console.log("here bud");
    setHabits(prev => [...prev, habit]);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Webcam
              onPredict={detections => setDetections(detections)}
            ></Webcam>
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper className={classes.paper}>
            {habits.map(habit => {
              console.log("habit", habit.type);
              switch (habit.type) {
                case "checkbox":
                  return <Checkbox habit={habit} detections={detections} />;
                case "timer":
                  console.log("yoo");
                  return <Timed habit={habit} detections={detections} />;
                case "strict_timed":
                  return <StrictTimed habit={habit} detections={detections} />;
                default:
                  console.log("the hell");
                  return <></>;
              }
            })}

            <HabitModal onSave={handleSave}></HabitModal>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
