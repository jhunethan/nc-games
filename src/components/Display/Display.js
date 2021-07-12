import { useState, useEffect } from "react";
import { getReviews } from "../../utils/api";
import "./Display.css";
import dateFormat from "dateformat";

export default function Display() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((response) => {
      const { reviews } = response.data;
      console.log(reviews[0]);
      setReviews(reviews);
    });
  }, []);

  return (
    <main>
      <h1>Reviews</h1>
      <section className="display__grid">
        {reviews.map((review, index) => {
          return (
            <div className="display__card" key={"review" + index}>
              <h1>{review.title}</h1>
              {review.review_img_url && <img
                src={review.review_img_url}
                alt={review.title}
                className="display__image"
              />}
              <h2>by {review.designer}</h2>
              <p>Votes: {review.votes}</p>
              <p>Comments: {review.comment_count}</p>
              <p>{review.review_body}</p>
              <p>Author: {review.owner}</p>
              <p>Added {dateFormat(review.created_at,"dS mmmm yyyy")}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
