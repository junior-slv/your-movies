import React, { useEffect } from 'react';
import { useState } from 'react';
import './Main.css'
import axios from "axios";
import { api_key } from '../../api'
type Response = {
  overview: string;
  poster_path: string;
  original_title: string;
};
function App() {
  const [imagem, setImagem] = useState("");
  const [resumo, setResumo] = useState("");
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    axios
     .get<Response>(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`)
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
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${imagem}`}/> 
      </div>
      <div className="movie-menu">
        <h1>O que devo assistir a seguir?</h1>
        <p>{titulo}</p>
        <p>{resumo}</p>
      </div>
      
    </div>
  );
}

export default App;
