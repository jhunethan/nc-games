import { useEffect, useState } from "react";
import { getCategories } from "../../utils/api";
import "./Nav.css";

export default function Nav(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((response) => {
      const { categories } = response.data;
      setCategories(categories);
    });
  }, []);

  return (
    <div className="navigationBar">
      {categories.map((category) => (
        <button className="navigationBar__button">{category.slug}</button>
      ))}
    </div>
  );
}
