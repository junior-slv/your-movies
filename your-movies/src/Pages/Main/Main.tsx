import React, { useEffect } from 'react';
import { useState } from 'react';
import './Main.css'
import axios from "axios";
import { api_key } from '../../api'
type Response = {
  overview: string;
  poster_path: string;
};
function App() {
  const [imagem, setImagem] = useState("");
  const [resumo, setResumo] = useState("");
  useEffect(() => {
    axios
     .get<Response>(`https://api.themoviedb.org/3/movie/550?api_key=${api_key}`)
     .then((res) => {
      setImagem(res.data.poster_path);
      setResumo(res.data.overview);
      console.log('massa')
     })

     .catch((err) => {
      console.log(err);
    })
  })
  
  
  return (
    <div className="container">
      <header>
        <h1>O que devo assistir a seguir?</h1>
        <p>{}</p>
      </header>
      
    </div>
  );
}

export default App;
