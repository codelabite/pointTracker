import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, purple, orange } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import firebase from "./firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },

  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatar1: {
    backgroundColor: orange[500],
  },
  textColor: {
    color: red[500],
  },
  textColor2: {
    color: orange[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("students");

  function getStudents() {
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
    getStudents();
  }, []);

  if (loading) {
    return <div>Loading...!</div>;
  }

  // const [spacing, setSpacing] = React.useState(2);
  // const classes = useStyles();

  // const handleChange = (event) => {
  //   setSpacing(Number(event.target.value));

  return (
    <div>
      <Grid conatiner style={{ paddingTop: 20, margin: 10 }}>
        <Grid items container>
          <Grid item xs={2} />
          <Grid item xs={6} spacing={3}>
            {students.map((students) => (
              <Card
                className={classes.root}
                key={students.id}
                style={{ margin: 20 }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      variant="rounded"
                      aria-label="Student's Total Points"
                      className={
                        students.point < 0 ? classes.avatar : classes.avatar1
                      }
                    >
                      {students.point}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="Profile">
                      <PersonIcon />
                    </IconButton>
                  }
                  title={
                    <div
                      className={
                        students.point < 0
                          ? classes.textColor
                          : classes.textColor2
                      }
                    >
                      {" "}
                      {students.point <= 0
                        ? "YOU REALLY HAVE TO WORK HARD"
                        : "YOU ARE DOING WELL"}
                    </div>
                  }
                  subheader="Points generated in Class!"
                />
                <CardMedia
                  className={classes.media}
                  image={students.image}
                  title={students.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h1">
                    {students.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {students.shortDesc}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="Add point"></IconButton>
                  <IconButton aria-label="Remove point" fontSize="large">
                    <Typography gutterBottom variant="h5" component="h2">
                      Cumulated Points:
                      <div
                        className={
                          students.point < 0
                            ? classes.textColor
                            : classes.textColor2
                        }
                      >
                        {students.point * students.totalCost}
                      </div>
                    </Typography>
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>More Detail:</Typography>

                    <Typography paragraph></Typography>
                    <Typography paragraph>{students.longDesc}</Typography>
                    <Typography></Typography>
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Grid>
    </div>
  );
}

// export default function SpacingGrid() {

//   };

//   return (

// <div>

// </div>

//   );
// }
