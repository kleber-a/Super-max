import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import './filme-info.css'
import api from '../../services/api';

function Movie(){

    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "ed512c83c2c5cec4adbe82ba872e273a",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado")
                navigate("/", { replace: true });
                return;
            })
        }
        loadFilme()

        return() => {
            console.log("Componente foi desmonatado")
        }
    }, [navigate, id])


    function salvarFilme(){
        const minhaLista = localStorage.getItem("@supermax");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            alert("Esse filme já esta na lista")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@supermax", JSON.stringify(filmesSalvos));
        alert("Filme Salvo com sucesso")

    }

    
  if(loading){
    return(
      <div className="filme-info">
        <h2>Carregando Detalhes</h2>
      </div>
    )
  }


    return(
        <div className='filme-info'>
           <h1>{filme.title}</h1>
           <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}  />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-button'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}
export default Movie;