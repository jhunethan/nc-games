import { useEffect, useState } from "react";
import { getReviews } from "../../utils/api";
import "./Display.css";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

function ReviewDisplay(props) {
  const [votes, setVotes] = useState(0);
  const { review } = props;

  useEffect(() => {
    setVotes(review.votes);
  }, [review]);

  function addVote(event) {
    event.preventDefault();
    setVotes((currVotes) => currVotes + 1);
  }

  return (
    <div className="display__card">
      <h2 className="display__title remove_bold">{review.title}</h2>
      <h3 className="display__subtitle remove_bold">by {review.designer}</h3>
      <div className="display__container--spacebetween">
        <p>{dateFormat(review.created_at, "dS mmmm yyyy")}</p>
        <p>Written by {review.owner}</p>
      </div>
      {review.review_img_url && (
        <img
          src={review.review_img_url}
          alt={review.title}
          className="display__image"
        />
      )}
      <p className="display__body">{review.review_body}</p>
      <div className="display__container--spacebetween">
        <p className="btn btn-secondary" onClick={addVote}>
          ⬆ {votes} Votes
        </p>
        <Link to={`/review/${review.review_id}`}>
          <p className="btn btn-secondary">
            View {review.comment_count} Comments
          </p>
        </Link>
      </div>
    </div>
  );
}

export default function Display(props) {
  const { reviews, setReviews } = props;

  useEffect(() => {
    if (!reviews.length) {
      getReviews().then((response) => {
        const { reviews } = response.data;
        setReviews(reviews);
      });
    }
  });

  return (
    <main>
      <section className="display__grid">
        {reviews.map((review) => {
          return <ReviewDisplay review={review} />;
        })}
      </section>
    </main>
  );
}
