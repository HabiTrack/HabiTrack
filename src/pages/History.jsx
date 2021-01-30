import React, { useEffect, useState } from "react";
import * as mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

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
            marked={[
            {
                date: new Date(2021, 1, 1),
                color: 'red',
            }, {
                date: new Date(2021, 1, 2),
                color: 'yellow',
            }, {
                date: new Date(2021, 1, 3),
                color: 'green'
            },
            {
                date: new Date(2021, 1, 4),
                color: 'red',
            }, {
                date: new Date(2021, 1, 5),
                color: 'yellow',
            }, {
                date: new Date(2021, 1, 6),
                color: 'green'
            }
          ]}
          />
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper className={classes.paper}>
            {/* Here goes the stats */}
            {console.log(startDate)}:
            FIller text: The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 ...
          </Paper>
        </Grid>
      </Grid>
    </div>
  ); 
}


// FUNCTIONS FOR SETTING UP STATUS OF EACH DAY
// array of routines
// loop through routines and extarct all dates
// look at habits of each routine and determine completion station 

// // markedDate schema, maybe use?
// const markedDates = {
//   title: 'Dates to make on Calendar',
//   type: 'object',
//   properties: {
//     date: { type: Date },
//     color: { type: 'string' }
//   },
//   required: ['date', 'color']
// };


// const getColor = (numCompleted, totalHabits) => {
//   if (numCompleted == 0) {
//     return 'red';
//   } else if (numCompleted == totalHabits) {
//     return 'green';
//   } else {
//     return 'yellow';
//   }
// }

// const allMarkedDates = [markedDates];
// // loop throug the routines
// for (var i = 0; i < routines.length; i++) {
//   // loop through the habits in this routine
//   const numCompleted = 0;
//   const totalHabits = routines[i].habits.length;
//   for (var j = 0; j < totalHabits; j++) {
//     if(routines[i].habits[j].completed){
//       numCompleted =  numCompleted + 1;
//     }
//   }
//   // create a markedDates object for the habit
//   const markedDate = {
//     date = routines[i].date,
//     color = getColor(numCompleted, totalHabits)
//   } ;
//   allMarkedDates.push();
// } 


  