import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Homepage.css";
import React, { useEffect } from "react";
import { auth, db } from "../Config/Config";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { onValue, ref, remove, set } from "firebase/database";

function Homepage() {
  const [todo, setTodo] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [desc, setDesc] = React.useState("");
  const [descs, setDescs] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const HanndleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // Read

  // Add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      desc: desc,
      uidd: uidd,
    });
    setTodo("");
    setDesc("");
  };
  // Update
  // Delete

  const handleDelete = (uidd) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uidd}`));
  };

  return (
    <div>
      <div className="mt5">
        <div className="float-start pe-5 text-center" style={{ width: "45%" }}>
          <div>
            <img
              style={{ width: "60px" }}
              src="./images/logo.jpg"
              alt="logo"
            ></img>
          </div>
          <div style={{ marginTop: "80px", marginLeft: "250px" }}>
            <h1>Todo</h1>
            <p>Enter your Todo and description</p>
          </div>
          <div
            style={{ marginTop: "50px", marginLeft: "250px", width: "50%" }}
            className="text-center"
          >
            <input
              type="text"
              required="required"
              value={todo}
              placeholder="Add Title..."
              style={{ width: "240px" }}
              onChange={(e) => setTodo(e.target.value)}
            />
            <input
              className="mt-3"
              required="required"
              type="text"
              value={desc}
              placeholder="Add description..."
              style={{ width: "240px" }}
              onChange={(e) => setDesc(e.target.value)}
            />
            <br />
            <button
              onClick={writeToDatabase}
              style={{ width: "150px", marginTop: "20px" }}
              className="btn btn-success rounded-0 "
            >
              Add
            </button>
          </div>
        </div>
        <div
          className="float-start me-5 border-start p-3 text-center"
          style={{ height: "80vh", width: "50%" }}
        >
          <div className="float-start">TODO LIST</div>

          {/* Logout Button */}
          <i
            style={{ cursor: "pointer" }}
            onClick={HanndleSignout}
            class="fa fa-sign-out float-end"
            aria-hidden="true"
          >
            Logout
          </i>

          <br />
          <br />
          <div className="mt-3 ">
            <div className="  " style={{ width: "55%", float: "left" }}>
              <div className="col-md-5">
                <div className="input-group ">
                  <input
                    className="w-25 form-control border-end-0 border"
                    type="search"
                    placeholder="Search"
                    id="example-search-input"
                  />
                  <span className="input-group-append">
                    <button
                      className="btn btn-outline-secondary bg-grey border-start-0 border-bottom-0 border ms-n5"
                      type="button"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="float-end " style={{ width: "40%", float: "left" }}>
            {/* select tag */}
            <select class="form-select" aria-label="Default select example">
              <option selected>Filter</option>
              <option value="1">Completed</option>
              <option value="2">Favorite</option>
              <option value="3">Deleted</option>
            </select>
          </div>

          <div style={{ marginTop: "100px" }}>
            {todos.map((todo) => (
              <table className="table border">
                <thead className="float-start">
                  <tr>
                    <th scope="col">{todo.todo}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="float-start" scope="row">
                      {todo.desc}
                    </td>

                    <td className="float-end" style={{ cursor: "pointer" }}>
                      <i
                        onClick={() => handleDelete(todo.uidd)}
                        className=" fa fa-trash "
                        aria-hidden="true"
                      ></i>
                    </td>
                    <td className="float-end" style={{ cursor: "pointer" }}>
                      <i class="fa fa-check" aria-hidden="true"></i>
                    </td>
                    <td className="float-end" style={{ cursor: "pointer" }}>
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>

      {/* <input
        type="text"
        value={todo}
        placeholder="Add todo..."
        onChange={(e) => setTodo(e.target.value)}
      />
      
      <button onClick={writeToDatabase}>Add</button>
      <button onClick={HanndleSignout}>Sign out</button>
      <br />
      {todos.map((todo) => (
        <div>
          <h1 key={todo.id}>{todo.todo}</h1>
          <button onClick={() => handleDelete(todo.uidd)}>Delete</button>
        </div>
      ))} */}
    </div>
  );
}

export default Homepage;
