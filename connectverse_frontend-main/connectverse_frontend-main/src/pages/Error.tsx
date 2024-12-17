
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      The page you requested is not available
      <Link to="/Home">Go Back</Link>
    </div>
  );
};

export default Error;
