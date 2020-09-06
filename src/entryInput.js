import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { green } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import VoiceChatIcon from "@material-ui/icons/VoiceChat";
import CircularIndeterminate from "./loadingCircle";
import { Link } from "react-router-dom";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const useStylesReddit = makeStyles((theme) => ({
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

function RedditTextField(props) {
  const classes = useStylesReddit();

  return (
    <TextField InputProps={{ classes, disableUnderline: true }} {...props} />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function CustomizedInputs() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [point, setPoint] = useState(0);
  const [totalCost, setTotalCost] = useState(50);

  // const classes = useStyles();
  // const [value, setValue] = React.useState("Controlled");

  // const handleChange = (event) => {
  //setValue(event.target.value);

  const ref = firebase.firestore().collection("students");

  function getStudent() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setStudents(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getStudent();
  }, []);

  if (loading) {
    return (
      <div>
        <CircularIndeterminate />
      </div>
    );
  }

  //Add Note
  function addStudent(newStudent) {
    ref
      .doc(newStudent.id)
      .set(newStudent)
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <List style={{ paddingLeft: "100px" }}>
      <div
        component="div"
        style={{ backgroundColor: "#transperent", height: "80px" }}
      />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        {/* <ListItemText primary="Name" secondary="Jan 9, 2014" /> */}
        <form className={classes.root} noValidate>
          <ThemeProvider>
            <TextField
              label="Full Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </ThemeProvider>
        </form>
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SportsSoccerIcon />
          </Avatar>
        </ListItemAvatar>
        <form className={classes.root} noValidate>
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.margin}
              label="Point"
              id="mui-theme-provider-standard-input"
              onChange={(e) => setPoint(e.target.value)}
            />
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <TextField
              className={classes.margin}
              label="Total Point"
              id="mui-theme-provider-standard-input"
              onChange={(e) => setTotalCost(e.target.value)}
            />
          </ThemeProvider>
        </form>
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ChatBubbleIcon />
          </Avatar>
        </ListItemAvatar>
        <TextField
          id="outlined-textarea"
          label="My Short Description"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          onChange={(e) => setShortDesc(e.target.value)}
        />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <VoiceChatIcon />
          </Avatar>
        </ListItemAvatar>
        <TextField
          id="filled-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="filled"
          onChange={(e) => setLongDesc(e.target.value)}
        />
      </ListItem>
      <div
        component="div"
        style={{ backgroundColor: "#transperent", height: "50px" }}
      />
      <div className={classes.root} style={{ paddingLeft: "100px" }}>



        <Button
          text-color="white"
          position="center"
          variant="contained"
          //color="secondary"
          style={{
            backgroundColor: "orange",
            textColor: "white",
          }}
          onClick={() =>
            addStudent({
              name,
              shortDesc,
              longDesc,
              point,
              totalCost,
              id: uuidv4(),
            })
          }
        >
          Add Student
        </Button>
      </div>
    </List>

    //   <Button
    //     variant="contained"
    //     color="secondary"
    //     onClick={() =>
    //       addStudent({
    //         name,
    //         shortDesc,
    //         longDesc,
    //         point,
    //         id: uuidv4(),
    //       })
    //     }
    //   >
    //     Add Student
    //   </Button>
  );
}
