import { useEffect, useState } from "react";
import { getCategories } from "../../utils/api";
import "./Nav.css";

export default function Nav(props) {
  const { setReviewsByCategory } = props;
  const [categories, setCategories] = useState([]);
  const [filterWord, setFilterWord] = useState("");

  useEffect(() => {
    getCategories().then((response) => {
      const { categories } = response.data;
      setCategories(categories);
    });
  }, []);

  function selectCategory(category) {
    setReviewsByCategory(category);
    setFilterWord(category);
  }

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
