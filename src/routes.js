import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import MyMovie from './pages/MyMovie'
import Header from "./components/Header";
import Movie from "./pages/Movie";
import Erro from "./pages/Erro";

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/movie/:id" element={<Movie/>} />
                <Route path="/mymovie" element={<MyMovie/>} />

                <Route path="*" element={<Erro/>} />
            </Routes>
        </BrowserRouter>
    );
}
export default RoutesApp;