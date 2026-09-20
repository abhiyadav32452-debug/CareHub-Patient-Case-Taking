import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <Link to="/" className="brand">
      <span className="brand-mark">✦</span>
      <span className="brand-copy">
        <strong>CareHub</strong>
        <small>PEOPLE · TECHNOLOGY · BETTER CARE</small>
      </span>
    </Link>
  );
}