import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';

const API = import.meta.env.VITE_API_URL || '/api';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setMovies([]);
      return;
    }
    fetch(`${API}/api/movies`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : [])
      .then(data => setMovies(data.movies || []))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, [user]);

  function handleDelete(movieId) {
    setMovies(prev => prev.filter(m => m._id !== movieId));
  }

  const processedMovies = useMemo(() => {
    let result = [...movies];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(m =>
        m.title.toLowerCase().includes(term) ||
        m.director.toLowerCase().includes(term)
      );
    }
    if (sortBy === 'title') result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === 'year') result.sort((a, b) => a.year - b.year);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [movies, searchTerm, sortBy]);

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Welcome to Movies Explorer</h2>
          <p>Please log in or register to view and manage your movie collection.</p>
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="btn-primary">Login</button>
            <button onClick={() => navigate('/register')} className="btn-secondary">Register</button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="loading">Loading movies...</div>;

  return (
    <div className="home-page">
      <div className="controls">
        <div className="search-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text" placeholder="Search by title or director..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
          <option value="title">Sort by Title</option>
          <option value="year">Sort by Year</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      <div className="movies-grid">
        {processedMovies.length === 0 ? (
          <p className="no-movies">No movies found. Add your first movie!</p>
        ) : (
          processedMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
