import React, { useState, useEffect } from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function Check({ habit, detections }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    detections.forEach(prediction => {
      const text = prediction["class"];
      if (!checked && text === habit.trigger) {
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
        label="Drink water"
      />
    </FormGroup>
  );
}
