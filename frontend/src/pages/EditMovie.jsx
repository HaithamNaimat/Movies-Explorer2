import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '/api';

function EditMovie() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', director: '', year: '', rating: '', genre: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetch(`${API}/api/movies/${id}`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data || !data.movie) throw new Error('Movie not found');
        const m = data.movie;
        setForm({ title: m.title, director: m.director, year: String(m.year), rating: String(m.rating), genre: m.genre });
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [user, id, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API}/api/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: form.title,
          director: form.director,
          year: Number(form.year),
          rating: Number(form.rating),
          genre: form.genre
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Edit Movie</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Movie title" value={form.title}
            onChange={handleChange} required className="auth-input" />
          <input name="director" placeholder="Director" value={form.director}
            onChange={handleChange} required className="auth-input" />
          <input name="year" type="number" placeholder="Year" value={form.year}
            onChange={handleChange} required className="auth-input" />
          <input name="rating" type="number" step="0.1" min="0" max="10"
            placeholder="Rating (0-10)" value={form.rating}
            onChange={handleChange} required className="auth-input" />
          <input name="genre" placeholder="Genre" value={form.genre}
            onChange={handleChange} required className="auth-input" />
          <button type="submit" className="auth-btn">Update Movie</button>
        </form>
      </div>
    </div>
  );
}

export default EditMovie;
