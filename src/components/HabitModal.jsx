import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { TimePicker } from "@material-ui/pickers";
import moment from "moment";
import { useStore } from "../contexts/StoreContext";
import { useAuth } from "../contexts/AuthContext";

const CustomContent = styled(DialogContent)({
  overflowY: "unset",
});

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: "25ch",
  },
  ageField: {
    width: "10ch",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "end",
  },
  formControl: {
    display: "block",
    width: "25ch",
    marginTop: theme.spacing(2),
    minWidth: 240,
  },

  time: {
    display: "block",
    margin: theme.spacing(2, 0, 1, 0),
    minWidth: 240,
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [error, setError] = React.useState({});

  const [title, setTitle] = React.useState("");
  const [trigger, setTrigger] = React.useState("");
  const [type, setType] = React.useState("");
  const [duration, setDuration] = React.useState(null);

  const isValid = habit => {
    let valid = true;

    const err = {};

    if (!habit.title) {
      err.title = true;
      valid = false;
    }
    if (!habit.trigger) {
      err.trigger = true;
      valid = false;
    }

    if (!habit.type) {
      err.type = true;
      valid = false;
    }

    if (!habit.duration && habit.type !== "checkbox") {
      err.duration = true;
      valid = false;
    }

    console.log(err);

    setError(err);

    return valid;
  };

  const { axios, host } = useStore();

  const { userData } = useAuth();

  const handleSubmit = () => {
    const habit = {
      title,
      trigger,
      type,
      duration,
    };

    if (isValid(habit)) {
      axios
        .post(host + "/api/routines/addhabit", {
          id: userData._id,
          ...habit,
        })
        .then(res => {
          console.log(res);

          props.onSave(res.data.habit);
        });

      setTitle("");
      setTrigger("");
      setType("");
      setDuration("");
      setError({});
      handleClose();
    }
  };

  const handleTypeChange = e => {
    const type = e.target.value;
    type === "checkbox" && setDuration(null);
    setType(e.target.value);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className="mr-2"
        onClick={handleClickOpen}
      >
        Create Habit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new habit</DialogTitle>
        <CustomContent>
          <DialogContentText style={{ minWidth: "300px" }}>
            Create your new daily habit here
          </DialogContentText>

          <form noValidate autoComplete="off">
            <TextField
              error={error.title}
              id="standard-basic"
              label="Title"
              margin="normal"
              className={classes.textField}
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              style={{ marginBottom: "0", marginTop: "0" }}
            />

            <FormControl
              className={classes.formControl}
              required
              error={error.trigger}
            >
              <InputLabel id="demo-simple-select-label">
                Trigger Object
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={trigger}
                onChange={(e, newValue) => setTrigger(e.target.value)}
                className={classes.textField}
              >
                <MenuItem value={"bottle"}>Bottle</MenuItem>
                <MenuItem value={"toothbrush"}>Tooth Brush</MenuItem>
                <MenuItem value={"book"}>Book</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              required
              error={error.type}
            >
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={handleTypeChange}
                className={classes.textField}
              >
                <MenuItem value={"checkbox"}>Checkbox</MenuItem>
                <MenuItem value={"timer"}>Timer</MenuItem>
                <MenuItem value={"strict_timer"}>Strict Timer (Beta)</MenuItem>
              </Select>
            </FormControl>

            {(type === "timer" || type === "strict_timer") && (
              <FormControl className={classes.time}>
                <TimePicker
                  ampm={false}
                  openTo="hours"
                  views={["hours", "minutes", "seconds"]}
                  format="HH:mm:ss"
                  label="Duration"
                  value={duration}
                  onChange={setDuration}
                  required
                  initialFocusedDate={moment().startOf("day")}
                  error={error.duration}
                />
              </FormControl>
            )}
          </form>
        </CustomContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
