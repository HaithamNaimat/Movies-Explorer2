import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join Movies Explorer to discover amazing films</p>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full name" value={name}
            onChange={e => setName(e.target.value)} required className="auth-input" />
          <input type="email" placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)} required className="auth-input" />
          <input type="password" placeholder="Create password" value={password}
            onChange={e => setPassword(e.target.value)} required className="auth-input" />
          <button type="submit" className="auth-btn">Create Account</button>
        </form>
        <p className="auth-link">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}

export default Register;
