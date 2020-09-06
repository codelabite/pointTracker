import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import firebase from "./firebase";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, point, totalCost, aCounter, rCounter) {
  return { name, point, totalCost, aCounter, rCounter };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

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

  // //Edit
  // function increasePoint(addPoint) {
  //   // const [counter, setCounter] = useState(0);
  //   setLoading(true);
  //   ref
  //     .doc(addPoint.id)
  //     .update(addPoint)
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Point</StyledTableCell>
            <StyledTableCell align="right">Total Cost&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Add Point&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Remove Point&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.map((students) => (
            <StyledTableRow key={students.name}>
              <StyledTableCell component="th" scope="row">
                {students.name}
              </StyledTableCell>
              <StyledTableCell align="right">{students.point}</StyledTableCell>
              <StyledTableCell align="right">
                {students.totalCost * students.point}
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  aria-label="Add point"
                  onClick={() => {
                    const db = firebase.firestore();
                    const increment = firebase.firestore.FieldValue.increment(
                      +1
                    );

                    // Document reference
                    const storyRef = db.collection("students").doc(students.id);

                    // Update read count
                    storyRef.update({ point: increment });
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  aria-label="Remove point"
                  onClick={() => {
                    const db = firebase.firestore();
                    const decrement = firebase.firestore.FieldValue.increment(
                      -1
                    );

                    // Document reference
                    const storyRef = db.collection("students").doc(students.id);

                    // Update read count
                    storyRef.update({ point: decrement });
                  }}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
