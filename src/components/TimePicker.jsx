import React, { Fragment, useState } from "react";
import { TimePicker } from "@material-ui/pickers";

function SecondsTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <TimePicker
        ampm={false}
        openTo="hours"
        views={["hours", "minutes", "seconds"]}
        format="HH:mm:ss"
        label="With seconds"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Fragment>
  );
}

export default SecondsTimePicker;
