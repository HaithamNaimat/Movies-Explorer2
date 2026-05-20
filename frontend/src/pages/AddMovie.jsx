import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '/api';

function AddMovie() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', director: '', year: '', rating: '', genre: '' });
  const [error, setError] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API}/api/movies`, {
        method: 'POST',
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

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Add New Movie</h2>
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
          <button type="submit" className="auth-btn">Add Movie</button>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
