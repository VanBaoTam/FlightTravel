import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      NotFound
      <Link to="/">
        <button>RETURN</button>
      </Link>
    </div>
  );
}

export default NotFound;
