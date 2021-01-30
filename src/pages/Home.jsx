import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Webcam from "../components/Webcam";

import HabitModal from "../components/HabitModal";

import Checkbox from "../components/Checkbox";
import Timed from "../components/Timed";
import StrictTimed from "../components/StrictTimed";

const habits = [
  {
    title: "Drink water",
    trigger: "bottle",
    type: "checkbox",
  },
  {
    title: "Play tennis",
    trigger: "toothbrush",
    type: "timed",
    duration: new Date().setHours(0, 1, 0, 0),
  },
  {
    title: "Brush teeth",
    trigger: "toothbrush",
    type: "strict_timed",
    duration: new Date(),
  },
];

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
                case "timed":
                  return <Timed habit={habit} detections={detections} />;
                case "strict_timed":
                  return <StrictTimed habit={habit} detections={detections} />;
                default:
                  return <></>;
              }
            })}

            <HabitModal></HabitModal>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
