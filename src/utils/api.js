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
