import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
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
