import { useEffect, useState } from "react";
import { getCategories } from "../../utils/api";
import { Dropdown } from "react-bootstrap";
import "./Nav.css";

export default function Nav(props) {
  const { reviews, requestReviews, category, sortedBy } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((response) => {
      const { categories } = response.data;
      setCategories(categories);
    });
  }, []);

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
                onClick={() => requestReviews({ category: category.slug })}
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
              onClick={() =>
                requestReviews({ sort_by: "votes", order_by: "DESC" })
              }
            >
              Highest Votes
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                requestReviews({ sort_by: "votes", order_by: "ASC" })
              }
            >
              Lowest Votes
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                requestReviews({ sort_by: "comment_count", order_by: "DESC" })
              }
            >
              Most Comments
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                requestReviews({ sort_by: "comment_count", order_by: "ASC" })
              }
            >
              Least Comments
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                requestReviews({ sort_by: "created_at", order_by: "DESC" })
              }
            >
              Newest First
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                requestReviews({ sort_by: "created_at", order_by: "ASC" })
              }
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
      {category && (
        <div>
          <h3>Filtering results by </h3>
          <button
            className="btn btn-lg btn-danger"
            onClick={() => requestReviews({ category: "" })}
          >
            {category} <span aria-hidden={true}>&times;</span>
          </button>
        </div>
      )}

      {sortedBy && (
        <div>
          <h3>Sorting results by </h3>
          <button
            className="btn btn-lg btn-danger"
            onClick={() => requestReviews({sort_by:""})}
          >
            {sortedBy} <span aria-hidden={true}>&times;</span>
          </button>
        </div>
      )}
    </nav>
  );
}
