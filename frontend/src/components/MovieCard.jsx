import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || '/api';

function MovieCard({ movie, onDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isOwner = user && movie.createdBy === user._id;

  async function handleDelete() {
    if (!confirm('Delete this movie?')) return;
    try {
      const res = await fetch(`${API}/movies/${movie._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok && onDelete) onDelete(movie._id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-card-body">
        <span className="movie-genre">{movie.genre}</span>
        <span className="movie-rating">{movie.rating}</span>
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-director">{movie.director}</p>
        <p className="movie-year">{movie.year}</p>
        {isOwner && (
          <div className="movie-actions">
            <button onClick={() => navigate(`/edit/${movie._id}`)} className="edit-btn">Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
