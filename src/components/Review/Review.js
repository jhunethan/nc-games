import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewByReviewId, getCommentsByReviewId } from "../../utils/api";
import dateFormat from "dateformat";
import axios from "axios";
import Header from "../Header/Header";

import "./Review.css";

export default function Review(props) {
  const [review, setReview] = useState();
  const [votes, setVotes] = useState(0);
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

  useEffect(() => {
    if (review) setVotes(review.votes);
  }, [review]);

  function addVote(event) {
    event.preventDefault();
    setVotes((currVotes) => currVotes + 1);
    axios
      .patch(`https://ncgames.herokuapp.com/api/reviews/${review.review_id}`, {
        inc_votes: 1,
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <section>
      <Header />
      {review && (
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
          <p className="btn btn-secondary" onClick={addVote}>
            ⬆ {votes} Votes
          </p>
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
