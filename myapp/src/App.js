import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import "./App.css";

function post() {
  var id = parseInt(document.getElementById("id").value);
  var title = document.getElementById("title").value;
  var published = document.getElementById("published").value;
  var url = `http://localhost:3001/posts/${title}/${parseInt(id)}/${published}`;

  axios.get(url).then((res) => {
    console.log(res.data);
  });
}

function handleIdClick(id) {
  let url = `http://localhost:3001/item/${id}`;
  axios.get(url).then((res) => {
    console.log(res);
    document.getElementById(id).innerHTML =
      res.data.title + ", " + res.data.published;
  });
}

function data() {
  var status = document.getElementById("status");
  let url = `http://localhost:3001/data`;

  axios.get(url).then((res) => {
    console.log(res);
    const ul = document.createElement("ul");
    ul.setAttribute("style", "padding: 0; margin: 0;");
    ul.setAttribute("id", "posts");
    if (res.data.length === 0) status.innerHTML = "No records to show";
    else {
      for (let i = 0; i <= res.data.length - 1; i++) {
        const button = document.createElement("button");
        button.data = "hi";
        button.innerHTML = res.data[i].id;
        button.onclick = () => handleIdClick(res.data[i].id);

        const div = document.createElement("div");
        div.id = res.data[i].id;

        const li = document.createElement("li");
        li.appendChild(button);
        li.appendChild(div);

        ul.appendChild(li);
      }
      if (status.hasChildNodes()) {
        status.removeChild(status.childNodes[0]);
      }
      status.appendChild(ul);
    }
  });
}

function deleteAll() {
  var url = "http://localhost:3001/deleteAll";

  axios.get(url).then((res) => {
    var status = document.getElementById("status");
    status.innerHTML = "All records have been deleted successfully";
  });
}

function App() {
  function handleSignupClick() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((e) => console.log(e.message));
  }

  function handleLoginClick() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((e) => console.log(e.message));
  }

  function handleSignout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  (function () {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBM3Kol97p3vu1iVSLX9VwM8J3b4xLiPKU",
      authDomain: "course-8d11e.firebaseapp.com",
      databaseURL: "https://course-8d11e-default-rtdb.firebaseio.com",
      projectId: "course-8d11e",
      storageBucket: "course-8d11e.appspot.com",
      messagingSenderId: "646016197490",
      appId: "1:646016197490:web:aceb1987b39da44fc2b3eb",
    };
    // Initialize Firebase
    initializeApp(firebaseConfig);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        document.getElementById("login-div").style.display = "none";
        document.getElementById("database-div").style.display = "inline";
      } else {
        document.getElementById("login-div").style.display = "inline";
        document.getElementById("database-div").style.display = "none";
      }
    });
  })();

  return (
    <>
      <div id="login-div">
        <input id="email" type="email" />
        <br />
        <input id="password" type="password" />
        <br />
        <button id="login" onClick={handleLoginClick}>
          login
        </button>
        <button id="signup" onClick={handleSignupClick}>
          signup
        </button>
      </div>
      <div id="database-div" style={{ display: "none" }}>
        <main
          role="main"
          className="container"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <form>
            <div className="form-group">
              <label htmlFor="id">Id</label>
              <input
                className="form-control"
                type="text"
                id="id"
                placeholder="id"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                type="text"
                id="title"
                placeholder="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="published">Published</label>
              <input
                className="form-control"
                type="text"
                id="published"
                placeholder="published"
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={post}>
              Submit
            </button>
          </form>
        </main>
        <div
          id="results"
          className="container"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <button
            id="showAll_btn"
            type="button"
            className="btn btn-primary"
            onClick={data}
          >
            Show All Data
          </button>
          <button
            id="deleteAll_btn"
            type="button"
            className="btn btn-danger"
            onClick={deleteAll}
          >
            Delete All Data
          </button>
          <button
            id="logout"
            className="btn btn-primary"
            onClick={handleSignout}
          >
            Logout
          </button>
          <br />
          <h3 className="mt-4">Results:</h3>
          <div className="mt-1" id="status"></div>
        </div>
      </div>
    </>
  );
}

export default App;
