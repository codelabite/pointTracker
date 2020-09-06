import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";

export default function Note() {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [point, setPoint] = useState(0);
  const [counter, setCounter] = useState(0);

  const ref = firebase.firestore().collection("note");

  function getNote() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setNote(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getNote();
  }, []);

  if (loading) {
    return <div>connecting to Network</div>;
  }
  //counter

  // function counterAdded() {
  //   setCounter(() => {
  //     counter + 1;
  //   });
  // }

  //Edit Note
  function editNote(updateNote) {
    setLoading();
    ref
      .doc(updateNote.id)
      .update(updateNote)
      .catch((err) => {
        console.error(err);
      });
  }

  // //Increase Count
  // function increaseCount() {
  //   const pointRef = ref.collection("note").doc("point");

  //   // Atomically increment the population of the city by 1.
  //   pointRef.update({
  //     point: firebase.firestore.FieldValue.increment(1),
  //   });
  // }

  // var washingtonRef = db.collection('cities').doc('DC');

  // // Atomically increment the population of the city by 50.
  // washingtonRef.update({
  //     population: firebase.firestore.FieldValue.increment(50)
  // });

  //Add Note
  function addNote(newNote) {
    ref
      .doc(newNote.id)
      .set(newNote)
      .catch((err) => {
        console.error(err);
      });
  }

  //Delete Note
  function deleteNote(note) {
    ref
      .doc(note.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  // //Addd
  // function doAdd() {
  //   ref
  //     .collection("note")
  //     .doc(newNote.id)
  //     .update({
  //       point: firebase.firestore.FieldValue.increment(1),
  //     });
  // }

  const db = firebase.firestore();
  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);
  // Document reference
  const pointRef = db.collection("note").doc("title");

  // Update read count
  pointRef.update({ point: increment });

  return (
    <div>
      {note.map((note) => (
        <div key={note.id}>
          <h1>{note.title}</h1>
          <h3>{note.point}</h3>
          <p>{note.desc}</p>
          <button
            onClick={() => {
              const db = firebase.firestore();
              const increment = firebase.firestore.FieldValue.increment(1);

              // Document reference
              const storyRef = db.collection("note").doc(note.id);

              // Update read count
              storyRef.update({ point: increment });
            }}
          >
            Add Point
          </button>
        </div>
      ))}

      <form style={{ padding: 40, margi: 10 }}>
        <label>title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />

        <label>point</label>
        <input type="number" onChange={(e) => setPoint(e.target.value)} />

        <div style={{ paddingTop: 10, margi: 10 }}>
          <label>description</label>
          <textarea onChange={(e) => setDesc(e.target.value)} />
        </div>
      </form>
      <button
        onClick={() =>
          addNote({
            title,
            desc,
            point,
            id: uuidv4(),
          })
        }
      >
        summit
      </button>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Add
      </button>
      <h3>{counter}</h3>
    </div>
  );
}
