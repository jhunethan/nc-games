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
  const [stateCategory, setStateCategory] = useState();
  const [sortedBy, setSortedBy] = useState();
  const [orderBy, setOrderBy] = useState();

  const getSortedLabel = () => {
    if (!sortedBy) return ;

    if (sortedBy === "created_at") {
      return orderBy === "DESC" ? "Newest First" : "Oldest First";
    }

    const output = [];
    output.push(orderBy === "DESC" ? "Most" : "Least");
    output.push(sortedBy === "votes" ? "Votes" : "Comments");
    return output.join(" ");
  };

  const requestReviews = ({
    sort_by = sortedBy,
    category = stateCategory,
    order_by = "ASC",
  }) => {
    setStateCategory(category);
    setSortedBy(sort_by);
    setOrderBy(order_by);
    getReviews({ category, sort_by, order_by }).then((response) => {
      const { reviews } = response.data;
      setReviews(reviews);
    });
  };

  useEffect(() => {
    if (!reviews.length) {
      getReviews({}).then((response) => {
        const { reviews } = response.data;
        setReviews(reviews);
      });
    }
  }, [reviews.length, stateCategory]);

  return {
    reviews,
    setReviews,
    requestReviews,
    stateCategory,
    sortedBy,
    orderBy,
    getSortedLabel,
  };
};
