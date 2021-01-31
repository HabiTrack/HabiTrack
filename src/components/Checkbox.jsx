import React, { useState, useEffect } from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { useStore } from "../contexts/StoreContext";
import { useAuth } from "../contexts/AuthContext";

export default function Check({ habit, detections }) {
  const [checked, setChecked] = useState(habit.completed);

  const { axios, host } = useStore();
  const { userData } = useAuth();

  useEffect(() => {
    detections.forEach(prediction => {
      const text = prediction["class"];
      if (!checked && text === habit.trigger) {
        axios
          .put(host + "/api/routines/updateHabit", {
            userId: userData._id,
            habit: {
              ...habit,
              completed: true,
            },
          })
          .then(res => {
            // send the updated record back to me
            console.log(res);
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
