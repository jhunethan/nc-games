import { useEffect } from "react";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { useVotes } from "../../Hooks/Hooks";
import "./Display.css";

function ReviewDisplay(props) {
  const { votes, setVotes, addVote } = useVotes();
  const { review } = props;

  useEffect(() => {
    setVotes(review.votes);
  }, [review, setVotes]);

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
        <button
          className="btn btn-secondary"
          onClick={(event) =>
            addVote({
              event,
              id: review.review_id,
              database: "reviews",
            })
          }
        >
          ⬆ {votes} Votes
        </button>
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

export default function Display(props) {
  const { reviews } = props;

  return (
    <main>
      {reviews.length ? (
        <section className="display__grid">
          {reviews.map((review, index) => {
            return <ReviewDisplay key={`review${index}`} review={review} />;
          })}
        </section>
      ) : (
        <div className="spinner-border absolute-center" role="status"></div>
      )}
    </main>
  );
}
