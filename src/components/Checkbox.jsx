import React, { useState, useEffect } from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";

export default function Check({ habit, detections }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    detections.forEach(prediction => {
      const text = prediction["class"];
      if (!checked && text === habit.trigger) {
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
            console.log(res.data.routines[0].habits);
          });

        setChecked(true);
      }
    });
  }, [detections]);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={e => setChecked(e.target.value)}
            name="Be a person"
          />
        }
        label={habit.title}
      />
    </FormGroup>
  );
}
