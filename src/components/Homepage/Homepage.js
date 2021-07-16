import { useReviews } from "../../Hooks/Hooks";
import Display from "../Display/Display";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import "./Homepage.css";

function Homepage(props) {
  const { user } = props;
  const { reviews, setReviews, requestReviews, stateCategory, getSortedLabel } =
    useReviews();

  return (
    <div className="Homepage">
      <Header user={user} />
      <Nav
        reviews={reviews}
        requestReviews={requestReviews}
        category={stateCategory}
        getSortedLabel={getSortedLabel}
      />
      <Display reviews={reviews} setReviews={setReviews} />
    </div>
  );
}

export default Homepage;
