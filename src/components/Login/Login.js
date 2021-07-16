import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  const { setUser } = props;
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      const response = await axios.get("https://ncgames.herokuapp.com/api/users")
      const { users } = response.data;
      if (componentMounted) {
        setUsers(users);
      }
    };
    fetchData();
    return () => {
      componentMounted = false;
    }
  }, []);
  
  return (
    <main>
      <form className="login__container">
        <h1>Login</h1>
        <h2>Select any of the following</h2>
        <div className="login__buttonContainer">
          {users.map((user) => (
            <Link to={{pathname:"/",user}} key={user.username} onClick={()=>history.goBack()} >
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
