import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import moment from "moment";
import { useStore } from "../contexts/StoreContext";
import { useAuth } from "../contexts/AuthContext";

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

  const { axios, host } = useStore();
  const { userData } = useAuth();

  const startTimer = () => {
    let intId = setInterval(() => {
      const dif = countdownDate.diff(moment());
      if (dif >= 0) {
        setDisplay(dif);
        setProgress(Math.floor((dif / totalTime) * 100));
      } else {
        axios
          .put(host + "/api/routines/updateHabit", {
            userId: userData.id,
            habit: {
              ...habit,
              completed: true,
            },
          })
          .then(res => {
            console.log(res);
          });
        clearInterval(intId);
      }
    }, 100);
    return intId;
  };

  useEffect(() => {
    detections.forEach(prediction => {
      const text = prediction["class"];
      if (!started && !habit.completed && text === habit.trigger) {
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
