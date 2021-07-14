import { useReviews } from "../../Hooks/Hooks";
import Display from "../Display/Display";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import "./Homepage.css";

function Homepage() {
  const { reviews, setReviews, setReviewsByCategory, sortReviews } =
    useReviews();

  return (
    <div className="Homepage">
      <Header />
      <Nav
        reviews={reviews}
        sortReviews={sortReviews}
        setReviewsByCategory={setReviewsByCategory}
      />
      <Display reviews={reviews} setReviews={setReviews} />
    </div>
  );
}

export default Homepage;
