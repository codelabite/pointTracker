import React, { Component } from "react";
import firebase from "./firebase";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
    };
  }

  handleChange = (files) => {
    this.setState({
      files: files,
    });
  };
  handleSave = () => {
    let bucketName = "images";
    let file = this.state.files[0];
    let storageRef = firebase.storage().ref("${bucketName}/${file.name}");
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      let downloadURL = uploadTask.snapshot.downloadURL;
    });
  };

  showImage = () => {
    let storageRef = firebase.storage().ref();
    let spaceRef = storageRef.child("images/" + this.state.files[0].name);
    storageRef
      .child("images/" + this.state.files[0].name)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        document.getElementById("new-img").src = url;
      });
  };

  state = {};
  render() {
    return (
      <div className="App">
        //{" "}
        <input
          type="file"
          onChange={(e) => {
            this.handleChange(e.target.files);
          }}
        />
        <button onClick={this.handleSave}>save</button>
        <button onClick={this.showImage}>show image</button>
        <img id="new-img" />
      </div>
    );
  }
}

export default App;
