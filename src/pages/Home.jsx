import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Webcam from "../components/Webcam";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import Slider from "@material-ui/core/Slider";

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

  const handleChange = () => {};

  const handleSlideChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePredict = detections => {
    detections.forEach(prediction => {
      const text = prediction["class"];
      if (!checked && text === "bottle") {
        setChecked(true);
      }
      if (text === "bottle") {
        setValue(prev => prev + 1);
      }
    });
  };

  const [checked, setChecked] = useState(false);

  const [value, setValue] = useState(0);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Webcam onPredict={handlePredict}></Webcam>
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Habits</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      name="Be a person"
                    />
                  }
                  label="Drink water"
                />
              </FormGroup>

              <FormGroup>
                <Slider
                  value={value}
                  onChange={handleChange}
                  aria-labelledby="continuous-slider"
                />
              </FormGroup>

              <FormGroup>
                <Slider
                  value={value}
                  onChange={handleSlideChange}
                  aria-labelledby="continuous-slider"
                />
              </FormGroup>
              <FormHelperText>Be careful</FormHelperText>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
