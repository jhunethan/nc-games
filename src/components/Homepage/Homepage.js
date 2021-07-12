import Display from "../Display/Display";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="Homepage">
      <Header />
      <Nav />
      <Display />
    </div>
  );
}

export default Homepage;
