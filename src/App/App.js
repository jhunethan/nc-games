import { BrowserRouter, Switch, Route } from "react-router-dom";
import Error from "../components/Error/Error";
import Homepage from "../components/Homepage/Homepage";
import Review from "../components/Review/Review";
import "./App.css";

export default function App() {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/review/:review_id">
            <Review />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </BrowserRouter>
    </main>
  );
}
