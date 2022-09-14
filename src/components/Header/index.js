import { Link } from "react-router-dom";
import "./style.css";

function Header() {
  return (
    <header className="header">
      <Link className="titulo" to="/">
        SuperMax
      </Link>
      <Link className="favoritos" to="/mymovie">Meus Filmes</Link>
    </header>
  );
}
export default Header;
