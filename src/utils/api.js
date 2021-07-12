import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://ncgames.herokuapp.com/api",
});

export const getCategories = async () => {
  const categories = await gamesApi.get("/categories");
  return categories;
};

export const getReviews = async () => {
  const reviews = await gamesApi.get("/reviews");
  return reviews;
};

export const getReviewByReviewId = async (review_id) => {
  const review = await gamesApi.get(`/reviews/${review_id}`);
  return review;
};

export const getCommentsByReviewId = async (review_id) => {
  if (!review_id) return;
  const comments = await gamesApi.get(`/reviews/${review_id}/comments`);
  return comments;
};
