import React, { useEffect, useState } from "react";
import * as mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/login.css"
import axios from "axios";
import moment from "moment";

mobiscroll.setOptions({
  theme: 'ios',
  themeVariant: 'light'
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
    return <React.Fragment>
            <CalendarPrev className="custom-prev" />
            <CalendarNav className="custom-nav" />
            <CalendarNext className="custom-next" />
    </React.Fragment>;
}

const [calendarType, setCalendarType] = React.useState('week');

const [startDate, setStartDate] = useState(new Date());

const [routinesData, setRoutinesData] = useState([]);

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
      setRoutinesData(res.data);
      console.log('one', res.data);
    });
}, []);

let message;
if (startDate.valueText) {
  message = <div>
    <div className="title">
      {startDate.valueText} Habits 
    </div>
  </div>
} else {
  message = <div className="title">
    Please select a date
  </div>
}


const getColor = (numCompleted, totalHabits) => {
  if (numCompleted == 0) {
    return 'red';
  } else if (numCompleted == totalHabits) {
    return 'green';
  } else {
    return '#FEE715FF';
  }
}

const createRoutineList = () => {
  console.log('two', routinesData);

  const allMarkedDates = [];
  const routines = routinesData.routines;
  console.log('three', routines);

  // loop throug the routines
  if(routines){
    for (var i = 0; i < routines.length; i++) {
      // loop through the habits in this routine
      let numCompleted = 0;
      const totalHabits = routines[i].habits.length;
      for (var j = 0; j < totalHabits; j++) {
        if(routines[i].habits[j].completed){
          numCompleted =  numCompleted + 1;
        }
      }
      // create a markedDates object for the habit
      const markedDate = {
        date: new Date(routines[i].date),
        color: getColor(numCompleted, totalHabits)
      } ;
      allMarkedDates.push(markedDate);
    } 
  }
  

  console.log('four', allMarkedDates);
  return allMarkedDates;
}

const generateHabbitsList = () => {
  const allHabits = [];
  const routines = routinesData.routines;
  // loop throug the routines
  if(routines){
    for (var i = 0; i < routines.length; i++) {
      // Check for the routine date
      const routineDate = moment(routines[i].date).format("YYYY/MM/DD");
      console.log('mun', routineDate);
      const selectedDate = moment(startDate.valueText).format("YYYY/MM/DD");
      console.log('nano', selectedDate);
      if(routineDate == selectedDate) {
        console.log('we in baby!!!');
        // loop through the habits in this routine
        const totalHabits = routines[i].habits.length;
        for (var j = 0; j < totalHabits; j++) {
          const habit = routines[i].habits[j];
          allHabits.push({
            title: habit.title,
            completed: habit.completed ? 'Completed' : 'Incomplete'
          });
          console.log(habit.title, habit.completed);
        }
      }
    } 
  }
  console.log(allHabits);
  return allHabits;
}

return (
    <div>
    <Grid container spacing={3}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
          <Datepicker
            selected={startDate} 
            onChange={date => setStartDate(date)}
            controls={['calendar']}
            display="inline"
            renderCalendarHeader={calendarHeaderCustom}
            marked = {createRoutineList()}
          //   marked={[
          //   {
          //       date: new Date(2021, 1, 1),
          //       color: 'red',
          //   }, {
          //       date: new Date(2021, 1, 2),
          //       color: 'yellow',
          //   }, {
          //       date: new Date(2021, 1, 3),
          //       color: 'green'
          //   },
          //   {
          //       date: new Date(2021, 1, 4),
          //       color: 'red',
          //   }, {
          //       date: new Date(2021, 1, 5),
          //       color: 'yellow',
          //   }, {
          //       date: new Date(2021, 1, 6),
          //       color: 'green'
          //   }
          // ]}
          />
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper className={classes.paper}>
            {/* Here goes the stats */}
            {/* {console.log(startDate.valueText)} */}
            {message}
            <div>
              {generateHabbitsList().map(data => <p><b>{data.title}</b>: {data.completed}</p>)}
            </div>
            {}
          </Paper>
        </Grid>

        <Grid item xs={7}>
          <div className="red"> No habbits completed this day <br/></div>
          <div className="yellow"> Some habbits completed this day <br/> </div>
          <div className="green"> All Habits completed this day <br/> </div>
        </Grid>
       
      </Grid>
    </div>
  ); 
}  