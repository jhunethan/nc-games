import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewByReviewId, getCommentsByReviewId } from "../../utils/api";
import dateFormat from "dateformat";
import Header from "../Header/Header";

import "./Review.css";

export default function Review(props) {
  const [review, setReview] = useState();
  const [comments, setComments] = useState([]);
  const params = useParams();
  const { review_id } = params;

  useEffect(() => {
    getReviewByReviewId(review_id).then((response) => {
      const { review } = response.data;
      setReview(review);
    });
  }, [review_id]);

  useEffect(() => {
    getCommentsByReviewId(review_id).then((response) => {
      const { comments } = response.data;
      setComments(comments);
    });
  }, [review, review_id]);

  return (
    <section>
      <Header />
      {review && (
        <div className="reviewCard__container">
          <h1>{review.title}</h1>
          <h2>by {review.designer}</h2>
          {review.review_img_url && (
            <img
              src={review.review_img_url}
              alt={review.title}
              className="display__image"
            />
          )}
          <p>Votes: {review.votes}</p>
          <p>Comments: {review.comment_count}</p>
          <p>{review.review_body}</p>
          <p>Author: {review.owner}</p>
          <p>Added {dateFormat(review.created_at, "dS mmmm yyyy")}</p>
        </div>
      )}
      <section className="comments__section">
          <h2>Comments</h2>
        {comments.map((comment, index) => {
          return (
            <div className="comments__card" key={`comment${index}`}>
              <h4>{comment.author}</h4>
              <p>{dateFormat(comment.created_at, "dS mmmm yyyy")}</p>
              <p>{comment.body}</p>
              <p>Votes: {comment.votes}</p>
            </div>
          );
        })}
      </section>
    </section>
  );
}
