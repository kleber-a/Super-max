import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import api from "../../services/api";
import "./style.css";

// https://api.themoviedb.org/3/movie/550?api_key=ed512c83c2c5cec4adbe82ba872e273a

function Home() {
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "ed512c83c2c5cec4adbe82ba872e273a",
          language: "pt-BR",
          page: 1,
        },
      });
      setFilme(response.data.results.slice(0, 10));
      setLoading(false)
    }
    loadFilme();
  }, []);

  console.log(filme);

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando Filmes</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filme.map((filme) => {
          return( 
          <article key={filme.id}>
            <strong>{filme.title}</strong>
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
            <Link to={`/movie/${filme.id}`}>Acessar</Link>
          </article>
          )     
    })}
      </div>
    </div>
  );
}
export default Home;
