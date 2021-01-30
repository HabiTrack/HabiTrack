import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import moment from "moment";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function LinearWithValueLabel({ habit, detections }) {
  const classes = useStyles();

  const time = moment(habit.duration);

  const duration = moment.duration({
    seconds: time.second(),
    minutes: time.minute(),
    hours: time.hour(),
  });

  const countdownDate = moment().add(duration);

  const [progress, setProgress] = React.useState(0);

  const [dis, setDis] = React.useState(duration.asMilliseconds());

  const startTimer = () => {
    const timer = setInterval(() => {
      const diff = countdownDate.diff(moment());
      setDis(diff);

      const progress = Math.floor((diff / duration.asMilliseconds()) * 100);
      setProgress(progress);
    }, 100);
  };

  useEffect(() => {
    let started = false;
    detections.forEach(prediction => {
      const text = prediction["class"];
      if (!started && text === habit.trigger) {
        console.log("aahh");
        started = true;
        startTimer();
      }
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
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {msToHMS(dis)}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
