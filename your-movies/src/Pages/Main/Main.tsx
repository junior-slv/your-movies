import { useEffect } from 'react';
import { useState } from 'react';
import './Main.css'
import axios from "axios";
import { api_key } from '../../api'
type Response = {
  overview: string;
  poster_path: string;
  title: string;
  genres: string;
  release_date: string;
};
const App = () => {
  
  const [posterstyle, setPosterstyle] = useState("movie-poster");
  const [infostyle, setInfostyle] = useState("movie-info");
  const [num, setNum] = useState(1);
  const [imagem, setImagem] = useState("");
  const [resumo, setResumo] = useState("");
  const [titulo, setTitulo] = useState("Nao disponivel, tente novamente");
  const [genero, setGenero] = useState("");
  const [lancamento, setLancamento] = useState("");

  const resultado = lancamento.substring(0, 4)
  function randomNumberInRange(min : number, max : number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleClick = () => {
    setNum(randomNumberInRange(1, 2000));
    setPosterstyle("movie-poster-v");
    setInfostyle("movie-info-v");

    
  };
  useEffect(() => {
    axios
     .get<Response>(`https://api.themoviedb.org/3/movie/${num}?api_key=${api_key}&language=pt-BR`)
     .then((res) => {
      setImagem(res.data.poster_path);
      setResumo(res.data.overview);
      setTitulo(res.data.title);
      setGenero(res.data.genres);
      setLancamento(res.data.release_date);


      
     })

     .catch((err) => {
      console.log(err);
    })
  })
  return (

    <div className="container">
      <div className={posterstyle} id="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${imagem}`}/> 
      </div>
      <div className="movie-menu">
        <h1>O que devo assistir a seguir?</h1>
        <input type="button" id='button' value='&#128073;Me surpreenda!' onClick={handleClick} />
        <div className={infostyle} id="movie-info" >
          <div className="header">
            <h2>{titulo} </h2>
            <h2>&#40;{resultado}&#41;</h2>
          </div>
          <p>{resumo}</p>
          <p>Deu Match? Veja mais em: <a href={`https://www.themoviedb.org/movie/${num}`}>{titulo}</a></p>
        </div>
      </div>
      
    </div>
  );
}

export default App;