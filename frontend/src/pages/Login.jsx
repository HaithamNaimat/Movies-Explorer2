import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue to Movies Explorer</p>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)} required className="auth-input" />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required className="auth-input" />
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
        <p className="auth-link">Don't have an account? <Link to="/register">Create one</Link></p>
      </div>
    </div>
  );
}

export default Login;
