import React, { useState, useEffect } from "react";
import { getHomeList, getMovieInfo } from "./Tmdb";

import './App.css';

import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from './components/Header'


const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await getHomeList();
      setMovieList(list);

      // Pegando o featured
      let originals = list.filter(i => i.slug === 'originals');
      let randamChosen = Math.floor(Math.random() * (originals[0].itens.results.length - 1))
      let chosen = originals[0].itens.results[randamChosen]
      let chosenInfo = await getMovieInfo(chosen.id, 'tv')

      setFeaturedData(chosenInfo)
    }

    loadAll();
  }, []);

  useEffect(() => {

    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }

  }, [])

  return (
    <div className="page">
      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} itens={item.itens}/>
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">💖</span> por Gabriel Aguiar <br/>
        Direitos de imagens para Netflix <br/>
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando" />
        </div>
      }
    </div>
  );
};

export default App;
