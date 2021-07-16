import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useReview, useVotes } from "../../Hooks/Hooks";
import dateFormat from "dateformat";
import Comments from "../Comments/Comments";

import "./Review.css";

export default function Review(props) {
  const { user } = props;

  const params = useParams();
  const { review_id } = params;

  const { votes, setVotes, addVote } = useVotes();
  const { review } = useReview(review_id);

  useEffect(() => {
    if (review) {
      setVotes(review.votes);
    }
  });

  return (
    <section>
      {review ? (
        <div className="reviewCard__container">
          <h2 className="display__title remove_bold">{review.title}</h2>
          <h3 className="display__subtitle remove_bold">
            by {review.designer}
          </h3>
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

          <button
            className="btn btn-secondary"
            onClick={(event) =>
              addVote({ event, id: review.review_id, database: "reviews" })
            }
          >
            ⬆ {votes} Votes
          </button>

          <section className="comments__section">
            <h2>Comments</h2>
            <Comments user={user} />
          </section>
        </div>
      ) : (
        <div className="spinner-border absolute-center" role="status"></div>
      )}
    </section>
  );
}
