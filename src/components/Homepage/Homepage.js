import { useState } from "react";
import Display from "../Display/Display";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import "./Homepage.css";

function Homepage() {
  const [reviews, setReviews ] = useState([])

  return (
    <div className="Homepage">
      <Header />
      <Nav reviews={reviews} setReviews={setReviews}/>
      <Display reviews={reviews} setReviews={setReviews}/>
    </div>
  );
}

export default Homepage;
