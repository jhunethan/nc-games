import dateFormat from "dateformat";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useVotes } from "../../Hooks/Hooks";
import "./Display.css";

//review Card
function ReviewCard(props) {
  const { review, setReviews } = props;
  const { votes, addVote, setVotes } = useVotes();

  useEffect(() => {
    setVotes(review.votes);
  });

  const incrementVote = (event) => {
    addVote({ event, id: review.review_id, database: "reviews" });
    setReviews((currReviews) => {
      return currReviews.map((currReview) => {
        if (currReview.review_id === review.review_id) {
          return {
            ...currReview,
            votes: currReview.votes + 1,
            hasBeenVoted: true,
          };
        }
        return currReview;
      });
    });
  };

  return (
    <div className="display__card">
      <h2 className="display__title remove_bold">{review.title}</h2>
      <h3 className="remove_bold">by {review.designer}</h3>
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
        {review.hasBeenVoted ? (
          <button className="btn btn-outline-success" disabled>
            ⬆ {votes} Votes
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={incrementVote}>
            ⬆ {votes} Votes
          </button>
        )}
        <Link to={`/review/${review.review_id}`}>
          <p className="btn btn-secondary">
            View {review.comment_count} Comment
            {review.comment_count > 1 ? "s" : ""}
          </p>
        </Link>
      </div>
    </div>
  );
}

// review list
export default function ReviewsList(props) {
  const { reviews, setReviews } = props;

  return (
    <main>
      {reviews.length ? (
        <section className="display__grid">
          {reviews.map((review, index) => {
            return (
              <ReviewCard
                key={`review${index}`}
                review={review}
                setReviews={setReviews}
              />
            );
          })}
        </section>
      ) : (
        <div className="spinner-border absolute-center" role="status"></div>
      )}
    </main>
  );
}
