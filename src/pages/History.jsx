import React, { useEffect, useState } from "react";
import * as mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/login.css";
import moment from "moment";

import { useStore } from "../contexts/StoreContext";
import { useAuth } from "../contexts/AuthContext";

mobiscroll.setOptions({
  theme: "ios",
  themeVariant: "light",
});

const Datepicker = mobiscroll.Datepicker;
const CalendarPrev = mobiscroll.CalendarPrev;
const CalendarNav = mobiscroll.CalendarNav;
const CalendarNext = mobiscroll.CalendarNext;

export default function History() {
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

  const calendarHeaderCustom = () => {
    return (
      <React.Fragment>
        <CalendarPrev className="custom-prev" />
        <CalendarNav className="custom-nav" />
        <CalendarNext className="custom-next" />
      </React.Fragment>
    );
  };

  const [startDate, setStartDate] = useState(new Date());

  const [routinesData, setRoutinesData] = useState([]);

  const { axios, host } = useStore();

  const { userData } = useAuth();

  useEffect(() => {
    axios
      .get(host + "/api/routines/gethabits", {
        params: {
          id: userData._id,
        },
      })
      .then(res => {
        setRoutinesData(res.data);
      });
  }, []);

  // Side pannel message
  let message;
  if (startDate.valueText) {
    message = (
      <div>
        <div className="title">{startDate.valueText} Habits</div>
      </div>
    );
  } else {
    message = <div className="title">Please select a date</div>;
  }

  // Get the colour of the days habit status
  const getColor = (numCompleted, totalHabits) => {
    if (numCompleted == 0) {
      return "red";
    } else if (numCompleted == totalHabits) {
      return "green";
    } else {
      return "#FEE715FF";
    }
  };

  // Create the list of dates that should be marked with their according status
  const createRoutineList = () => {
    const allMarkedDates = [];
    const routines = routinesData.routines;

    // loop throug the routines
    if (routines) {
      for (var i = 0; i < routines.length; i++) {
        // loop through the habits in this routine
        let numCompleted = 0;
        const totalHabits = routines[i].habits.length;
        for (var j = 0; j < totalHabits; j++) {
          if (routines[i].habits[j].completed) {
            numCompleted = numCompleted + 1;
          }
        }
        // create a markedDates object for the habit
        const markedDate = {
          date: new Date(routines[i].date),
          color: getColor(numCompleted, totalHabits),
        };
        allMarkedDates.push(markedDate);
      }
    }
    return allMarkedDates;
  };

  // Generate the list of habits and their status
  const generateHabitsList = () => {
    const allHabits = [];
    const routines = routinesData.routines;
    // loop through the routines
    if (routines) {
      for (var i = 0; i < routines.length; i++) {
        // Check for the routine date
        const routineDate = moment(routines[i].date).format("YYYY/MM/DD");
        const selectedDate = moment(startDate.valueText).format("YYYY/MM/DD");
        if (routineDate == selectedDate) {
          // loop through the habits in this routine
          const totalHabits = routines[i].habits.length;
          for (var j = 0; j < totalHabits; j++) {
            const habit = routines[i].habits[j];
            allHabits.push({
              title: habit.title,
              completed: habit.completed ? "Completed" : "Incomplete",
            });
          }
        }
      }
    }
    return allHabits;
  };

  return (
    <div>
      <Grid container spacing={3}>
        {/* Calandar that displays habit statuses for different days */}
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Datepicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              controls={["calendar"]}
              display="inline"
              renderCalendarHeader={calendarHeaderCustom}
              marked={createRoutineList()}
            />
          </Paper>
        </Grid>

        {/* List of the selected days habits */}
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            {message}
            <div>
              {generateHabitsList().map(data => (
                <p>
                  <b>{data.title}</b>: {data.completed}
                </p>
              ))}
            </div>
            {}
          </Paper>
        </Grid>

        {/* Explains the statuses in the calandar */}
        <Grid item xs={7}>
          <div className="red">
            {" "}
            No habits completed this day <br />
          </div>
          <div className="yellow">
            {" "}
            Some habits completed this day <br />{" "}
          </div>
          <div className="green">
            {" "}
            All habits completed this day <br />{" "}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
