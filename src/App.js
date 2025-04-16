import './App.css';
import './styles.css';
import { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieGrid from './components/MovieGrid';
import Watchlist from './components/Watchlist';

function App() {

  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(()=>{
    fetch("movies.json")
    .then(res => res.json())
    .then(data => setMovies(data));
  },[]);

  const toggleWatchlist = (movieId) => {
    setWatchlist(prev =>
      prev.includes(movieId) ? prev.filter(id => id !== movieId ) : [...prev, movieId]
    )
  }
  

  return (
    <div className="App">
      <div className='container'>
        <Header></Header>
        <Router>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/watchlist'>Watchlist</Link>
                </li>
              </ul>

            </nav>
            <Routes>
                <Route path='/' element={<MovieGrid movies={movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist}/>}></Route>
                <Route path='/watchlist' element={<Watchlist movies={movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist}/>}></Route>
            </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
