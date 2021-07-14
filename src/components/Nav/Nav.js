import { useEffect, useState } from "react";
import { getCategories } from "../../utils/api";
import { Dropdown } from "react-bootstrap";
import "./Nav.css";

export default function Nav(props) {
  const { reviews, setReviewsByCategory, sortReviews } = props;
  const [categories, setCategories] = useState([]);
  const [filterWord, setFilterWord] = useState("");
  const [sortedBy, setSortedBy] = useState();

  useEffect(() => {
    getCategories().then((response) => {
      const { categories } = response.data;
      setCategories(categories);
    });
  }, []);

  function selectCategory(category) {
    setReviewsByCategory(category);
    setFilterWord(category);
    setSortedBy();
  }

  return (
    <nav>
      <div className="navigationBar">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Categories
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {categories.map((category, index) => (
              <Dropdown.Item
                onClick={() => selectCategory(category.slug)}
                className="navigationBar__button"
                key={category + index}
              >
                {category.slug}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Sort by
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                sortReviews("votes", "DESC");
                setSortedBy("Most Votes");
              }}
            >
              Highest Votes
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortReviews("votes", "ASC");
                setSortedBy("Least Votes");
              }}
            >
              Lowest Votes
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortReviews("comment_count", "DESC");
                setSortedBy("Most Comments");
              }}
            >
              Most Comments
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortReviews("comment_count", "ASC");
                setSortedBy("Least Comments");
              }}
            >
              Least Comments
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortReviews("created_at", "DESC");
                setSortedBy("Newest First");
              }}
            >
              Newest First
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortReviews("created_at", "ASC");
                setSortedBy("Oldest First");
              }}
            >
              Oldest First
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {reviews.length ? (
        <div>
          <h3>Showing {reviews.length} Reviews</h3>
        </div>
      ) : null}
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

      {sortedBy && (
        <div>
          <h3>Sorting results by </h3>
          <button
            className="btn btn-lg btn-danger"
            onClick={() =>{ setSortedBy();sortReviews("")}}
          >
            {sortedBy} <span aria-hidden={true}>&times;</span>
          </button>
        </div>
      )}
    </nav>
  );
}
