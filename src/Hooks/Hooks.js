import axios from "axios";
import { useEffect, useState } from "react";
import { getReviewByReviewId, getReviews } from "../utils/api";

export const useVotes = (initialVotes = 0) => {
  const [votes, setVotes] = useState(initialVotes);

  function addVote(event, review_id) {
    const { target } = event;

    event.preventDefault();
    setVotes((currVotes) => currVotes + 1);

    target.classList.add("btn-outline-success");
    target.classList.remove("btn-secondary");
    target.disabled = true;

    axios.patch(`https://ncgames.herokuapp.com/api/reviews/${review_id}`, {
      inc_votes: 1,
    });
  }

  return { votes, setVotes, addVote };
};

export const useReview = (review_id) => {
  const [review, setReview] = useState();

  useEffect(() => {
    if (review_id)
      getReviewByReviewId(review_id).then((response) => {
        const { review } = response.data;
        setReview(review);
      });
  }, [review_id]);

  return { review, setReview };
};

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState();

  const setReviewsByCategory = (category) => {
    setCategory(category);
    getReviews(category).then((response) => {
      const { reviews } = response.data;
      setReviews(reviews);
    });
  };

  const sortReviews = (field, order) => {
    if (!field) setReviews([]);
    setReviews((currReviews) => {
      if (field === "created_at")
        return [...currReviews].sort((a, b) => {
          if (order === "ASC") {
            if (a["created_at"] > b["created_at"]) return 1;
            return -1;
          } else {
            if (a["created_at"] > b["created_at"]) return -1;
            return 1;
          }
        });

      return [...currReviews].sort((a, b) => {
        if (order === "DESC") return b[field] - a[field];
        else return a[field] - b[field];
      });
    });
  };

  useEffect(() => {
    if (!reviews.length) {
      getReviews(category).then((response) => {
        const { reviews } = response.data;
        setReviews(reviews);
      });
    }
  }, [reviews.length, category]);

  return { reviews, setReviews, setReviewsByCategory, sortReviews };
};
