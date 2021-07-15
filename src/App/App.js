import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Error from "../components/Error/Error";
import Homepage from "../components/Homepage/Homepage";
import Login from "../components/Login/Login";
import Review from "../components/Review/Review";
import "./App.css";

export default function App() {
  const [user, setUser] = useState();

  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Homepage setUser={setUser} user={user} />
          </Route>
          <Route path="/review/:review_id">
            <Review user={user} />
          </Route>
          <Route path="/login">
            <Login setUser={(user)=>setUser(user)} />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </BrowserRouter>
    </main>
  );
}
