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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TimePicker from "./TimePicker";

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
    marginTop: 0,
  },
  ageField: {
    width: "10ch",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "end",
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },

  time: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
}));

const conditions = [
  "diabetes",
  "neuro",
  "hypertension",
  "cancer",
  "ortho",
  "respiratory",
  "cardiacs",
  "kidney",
  "blood",
  "prostate",
  "thyroid",
];

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [age, setAge] = React.useState("");
  const [type, setType] = React.useState("");

  const [gender, setGender] = React.useState("");

  const [checked, setChecked] = React.useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChange = event => {
    setAge(event.target.value);
  };

  const handleTypeChange = event => {
    setType(event.target.value);
  };

  const handleSubmit = () => {
    const conditions = {};
    checked.forEach(function (v) {
      conditions[v] = 1;
    });
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

          <form
            noValidate
            autoComplete="off"
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <TextField
              id="standard-basic"
              label="Title"
              margin="normal"
              className={classes.textField}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Trigger Object
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={10}>Bottle</MenuItem>
                <MenuItem value={20}>Tooth Brush</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={handleTypeChange}
              >
                <MenuItem value={10}>Checkbox</MenuItem>
                <MenuItem value={20}>Timer</MenuItem>
                <MenuItem value={30}>Strict Timer (Beta)</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.time}>
              <TimePicker></TimePicker>
            </FormControl>
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
