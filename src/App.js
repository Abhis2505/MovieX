import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {fetchDataFromApi} from './utils/api';

import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres} from './store/homeSlice'

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
import PageNotFound from './pages/404/PageNotFound';

function App() {

  const dispatch = useDispatch();
  const {url} = useSelector(state => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = async () => {
    await fetchDataFromApi('/configuration')
      .then(res => {
        const url = {
          backdrop: res.images.secure_base_url + res.images.backdrop_sizes[3],
          poster: res.images.secure_base_url + res.images.poster_sizes[3],
          profile: res.images.secure_base_url + res.images.profile_sizes[3],
        }
        dispatch(getApiConfiguration(url));
      }
      );
  }

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"]
    let allGeneres = {}

    endpoints.forEach(endpoint => {
      promises.push(fetchDataFromApi(`/genre/${endpoint}/list`))
    })

    const data = await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((item) => (allGeneres[item.id] = item))
    })
    dispatch(getGenres(allGeneres));
  }

  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:mediaType/:id" element={<Details />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/explore/:mediaType" element={<Explore />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
