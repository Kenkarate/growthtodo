import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Homepage.css";
import React, { useEffect } from "react";
import { auth, db } from "../Config/Config";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { onValue, ref, remove, set, update } from "firebase/database";

function Homepage() {
  const [todo, setTodo] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [desc, setDesc] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [all, setAll] = React.useState(true);

  const navigate = useNavigate();

  // Read

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
  }, [filter]);

  console.log(todos);

  // Add

  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      desc: desc,
      uidd: uidd,
      status: "all",
    });
    setTodo("");
    setDesc("");
  };

  // Update
  const handleComplete = (uidd) => {
    update(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      status: "complete",
      uidd: uidd,
    });
  };

  const handleFavorite = (uidd) => {
    update(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      status: "favorite",
      uidd: uidd,
    });
  };

  const handleDelete = (uidd) => {
    update(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      status: "deleted",
      uidd: uidd,
    });
    setFilter("deleted");
  };

  // Delete

  // const handleDelete = (uidd) => {
  //   remove(ref(db, `/${auth.currentUser.uid}/${uidd}`));
  // };

  // Completed

  const handleCompleted = (e) => {
    if (e.target.value == 1) {
      setAll(true);
    } else if (e.target.value == 2) {
      setAll(false);
      setFilter("complete");
    } else if (e.target.value == 3) {
      setAll(false);
      setFilter("favorite");
    } else if (e.target.value == 4) {
      setAll(false);
      setFilter("deleted");
    }
  };

  // Signout

  const HanndleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
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
            className="fa fa-sign-out float-end"
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
            <select
              onChange={handleCompleted}
              className="form-select"
              aria-label="Default select example"
            >
              <option value={1}>Filter</option>
              <option value={2}>Completed</option>
              <option value={3}>Favorite</option>
              <option value={4}>Deleted</option>
            </select>
          </div>

          
          <div style={{ marginTop: "100px" }}>
            
            {todos.map((todo, index) => {
              if (all && todo.status != "deleted") {
                return <table className="table border">
                <thead className="float-start">
                  <tr key={index}>
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
                      <i
                        onClick={() => handleComplete(todo.uidd)}
                        className="fa fa-check-circle-o"
                        aria-hidden="true"
                      ></i>
                    </td>
                    <td className="float-end" style={{ cursor: "pointer" }}>
                      <i
                        onClick={() => handleFavorite(todo.uidd)}
                        className="fa fa-star"
                        aria-hidden="true"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              } else if (filter == todo.status) {
                return <table className="table border">
                <thead className="float-start">
                  <tr key={index}>
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
                      <i
                        onClick={() => handleComplete(todo.uidd)}
                        className="fa fa-check-circle-o"
                        aria-hidden="true"
                      ></i>
                    </td>
                    <td className="float-end" style={{ cursor: "pointer" }}>
                      <i
                        onClick={() => handleFavorite(todo.uidd)}
                        className="fa fa-star"
                        aria-hidden="true"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              }
            })}

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
