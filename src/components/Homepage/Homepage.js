import { useReviews } from "../../Hooks/Hooks";
import ReviewsList from "../Display/Display";
import Nav from "../Nav/Nav";
import "./Homepage.css";

function Homepage(props) {
  const { reviews, setReviews, requestReviews, stateCategory, getSortedLabel } =
    useReviews();

  return (
    <div className="Homepage">
      <Nav
        reviews={reviews}
        requestReviews={requestReviews}
        category={stateCategory}
        getSortedLabel={getSortedLabel}
      />
      <ReviewsList reviews={reviews} setReviews={setReviews} />
    </div>
  );
}

export default Homepage;
