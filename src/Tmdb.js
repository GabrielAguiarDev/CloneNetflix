const API_KEY = "4e215cf913ffdc2aa1d1c17fb125683f";
const API_BASE = "https://api.themoviedb.org/3";

/*
- originais da netflix
- recomendados (tranding)
- em alta (top rated)
- ação
- comédia
- terror
- romance
- documentários
*/

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

const getHomeList = async () => {
  return [
    {
      slug: "originals",
      title: "Originais do Netflix",
      itens: await basicFetch(
        `/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "tranding",
      title: "Recomendados para voçê",
      itens: await basicFetch(
        `/trending/all/week?language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "toprated",
      title: "Em alta",
      itens: await basicFetch(
        `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "action",
      title: "Ação",
      itens: await basicFetch(
        `/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "comedy",
      title: "Comédia",
      itens: await basicFetch(
        `/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "horror",
      title: "Terror",
      itens: await basicFetch(
        `/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "romance",
      title: "Romance",
      itens: await basicFetch(
        `/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "documentary",
      title: "Documentários",
      itens: await basicFetch(
        `/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`
      ),
    },
  ];
};

const getMovieInfo = async (movieId, type) => {
  let info = {}

  if(movieId) {
    switch (type) {
      case 'movie':
        info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
      break;
      case 'tv':
        info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
      break;
      default:
        info = null
      break;
    }
  }

  return info;
}

export { getHomeList, getMovieInfo }