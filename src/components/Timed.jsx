import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import moment from "moment";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});
let started = false;

export default function LinearWithValueLabel({ habit, detections }) {
  const classes = useStyles();

  const time = moment(habit.duration);
  const duration = moment.duration({
    seconds: time.second(),
    minutes: time.minute(),
    hours: time.hour(),
  });
  const totalTime = duration.asMilliseconds();

  const countdownDate = moment().add(duration);

  const [progress, setProgress] = React.useState(habit.completed ? 0 : 100);

  const [display, setDisplay] = React.useState(totalTime);

  let timerId;

  const startTimer = () => {
    let shit = setInterval(() => {
      const dif = countdownDate.diff(moment());
      if (dif >= 0) {
        setDisplay(dif);
        setProgress(Math.floor((dif / totalTime) * 100));
      } else {
        console.log("bruh");

        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE1YzNkODU1ZWViZTEzYTAwMGY1MjIiLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJCYXJhc2EiLCJlbWFpbCI6InBiQGVtYWlsLmNvbSIsImlhdCI6MTYxMjA0NzQxMX0.Rbx8UktbVnmUkfJi0AR3sdoZkbh5s8rZEZ2UezTsIPk";

        axios.defaults.headers.put["Access-Control-Allow-Origin"] = "*";
        axios.defaults.headers.put["Content-Type"] = "application/json";
        axios.defaults.headers.put["Access-Control-Allow-Origin"] = "*";
        axios.defaults.headers.put["Authorization"] = "Bearer " + token;

        axios
          .put("http://localhost:5000/api/routines/updateHabit", {
            userId: "6015c1fadfa1e55a4428fdb6",
            habit: {
              ...habit,
              completed: true,
            },
          })
          .then(res => {
            console.log(res);
          });
        clearInterval(shit);
      }
    }, 100);
  };

  useEffect(() => {
    detections.forEach(prediction => {
      const text = prediction["class"];
      console.log("start", started);
      if (!started && !habit.completed && text === habit.trigger) {
        console.log("aahh");
        started = true;
        timerId = startTimer();
      }

      return timerId => {
        clearInterval(timerId);
      };
    });
  }, [detections]);

  function msToHMS(ms) {
    // 1- Convert to seconds:
    var seconds = ms / 1000;
    // 2- Extract hours:
    var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    return hours + ":" + minutes + ":" + Math.floor(seconds);
  }

  return (
    <div className={classes.root}>
      <Typography variant={"body1"}>{habit.title}</Typography>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {msToHMS(display)}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
