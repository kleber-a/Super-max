import {useEffect,useState} from 'react';
import './Favorites.css';
import {Link} from 'react-router-dom';

function MyMovie(){
    const [filmes,setFilmes] = useState([]);

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@supermax");
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item) => {
            return(item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@supermax", JSON.stringify(filtroFilmes));
    }


    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(     </span>}
            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <img  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title}  />
                            <div>
                                <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                                <button onClick={()=> excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default MyMovie;