import { useEffect, useState } from "react";
import { getCategories, getReviews } from "../../utils/api";
import "./Nav.css";

export default function Nav(props) {
  const { setReviews } = props;
  const [categories, setCategories] = useState([]);
  const [filterWord, setFilterWord] = useState("");

  useEffect(() => {
    getCategories().then((response) => {
      const { categories } = response.data;
      setCategories(categories);
    });
  }, []);

  const selectCategory = (category) => {
    setFilterWord(category);
    getReviews().then((response) => {
      const { reviews } = response.data;
      if (category) {
        const filteredResults = reviews.filter(
          (review) => review.category === category
        );
        setReviews(filteredResults);
      } else {
        setReviews(reviews);
      }
    });
  };

  return (
    <nav>
      <div className="navigationBar">
        {categories.map((category, index) => (
          <button
            onClick={() => selectCategory(category.slug)}
            className="navigationBar__button"
            key={category + index}
          >
            {category.slug}
          </button>
        ))}
      </div>
      {filterWord && (
        <div>
          <h3>Filtering results by </h3>
          <button
            className="btn btn-lg btn-danger"
            onClick={() => selectCategory("")}
          >
            {filterWord} <span aria-hidden={true}>&times;</span>
          </button>
        </div>
      )}
    </nav>
  );
}
