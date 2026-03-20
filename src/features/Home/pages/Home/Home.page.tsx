// Functions
// Components
import { Link } from "react-router";
import { Button } from "../../../../components/reusable/Button/Button";
import { MainLayout } from "../../../../layouts/Main/Main.layout";
import { RECOMMENDATIONS } from "../../constants/recommendations";
// Assets
// Styles
import "./Home.page.css";

export const HomePage = () => {
  return (
    <MainLayout>
      <div className="hero-section">
        <h1>
          Discover your next
          <br />
          <span>great read</span>
        </h1>
        <p>
          Search millions of books from the Open Library. Click any book to
          learn more.
        </p>
      </div>
      <div className="recommendation-section">
        {RECOMMENDATIONS.map((recommendation) => (
          <Link to={`/books/?search=${recommendation}`}>
            <Button className="recommendation-button">{recommendation}</Button>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
};
