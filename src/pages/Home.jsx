import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Webcam from "../components/Webcam";

import HabitModal from "../components/HabitModal";

import Checkbox from "../components/Checkbox";
import Timed from "../components/Timed";
import StrictTimed from "../components/StrictTimed";
import { useStore } from "../contexts/StoreContext";
import { useAuth } from "../contexts/AuthContext";

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

  const { axios, host } = useStore();

  const { userData } = useAuth();

  useEffect(() => {
    console.log("data", userData._id);
    axios
      .get(host + "/api/routines/getLatestRoutine", {
        params: {
          id: userData._id,
        },
      })
      .then(res => {
        console.log(res.data.routine.habits);
        setHabits(res.data.routine.habits);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSave = habit => {
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
              switch (habit.type) {
                case "checkbox":
                  return <Checkbox habit={habit} detections={detections} />;
                case "timer":
                  return <Timed habit={habit} detections={detections} />;
                case "strict_timed":
                  return <StrictTimed habit={habit} detections={detections} />;
                default:
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
