import { Link } from "react-router-dom";
import Header from "../Header/Header";

export default function Error() {
  return (
    <div>
      <Header />
      <section className="grid-center">
        <div>
          <h1>Error 404: Page not found</h1>

          <Link to="/">
            <button className="btn btn-primary btn-lg">Return to Homepage</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
