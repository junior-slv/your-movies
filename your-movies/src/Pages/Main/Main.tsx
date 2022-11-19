import { useEffect } from 'react';
import { useState } from 'react';
import './Main.css'
import axios from "axios";
import { api_key } from '../../api'
type Response = {
  overview: string;
  poster_path: string;
  original_title: string;
  success: string;
};
const App = () => {
  const [posterstyle, setPosterstyle] = useState("movie-poster");
  const [infostyle, setInfostyle] = useState("movie-info");
  const [num, setNum] = useState(550);
  const [imagem, setImagem] = useState("Nao disponivel, tente novamente");
  const [resumo, setResumo] = useState("Nao disponivel, tente novamente");
  const [titulo, setTitulo] = useState("Nao disponivel, tente novamente");
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
     .get<Response>(`https://api.themoviedb.org/3/movie/${num}?api_key=${api_key}`)
     .then((res) => {
      setImagem(res.data.poster_path);
      setResumo(res.data.overview);
      setTitulo(res.data.original_title);
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
        <input type="button" id='button' value='Me surpreenda!' onClick={handleClick} />
        <div className={infostyle} id="movie-info" >
          <p>{titulo}</p>
          <p>{resumo}</p>
        </div>
      </div>
      
    </div>
  );
  function asd(){
   const style = {
      opacity: 1,
    };
  }
}

export default App;