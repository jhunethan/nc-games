import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Login.css";

export default function Login(props) {
  const { setUser } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://ncgames.herokuapp.com/api/users").then((response) => {
      const { users } = response.data;
      setUsers(users);
    });
  }, []);

  return (
    <main>
      <Header />
      <form className="login__container">
        <h1>Login</h1>
        <h2>Select any of the following</h2>
        <div className="login__buttonContainer">
          {users.map((user) => (
            <Link to={{pathname:"/",user}} key={user.username} >
              <button
                className="btn btn-outline-primary login__button"
                onClick={() => setUser(user)}
              >
                {user.username}
              </button>
            </Link>
          ))}
        </div>
      </form>
    </main>
  );
}
