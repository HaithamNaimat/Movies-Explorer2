import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <header className="header">
      <div className="header-content">
        <NavLink to="/" className="logo">
          <span className="logo-icon">🎬</span>
          Movies Explorer
        </NavLink>
        <nav className="nav">
          <NavLink to="/" className="nav-link" end>Home</NavLink>
          {user ? (
            <>
              <NavLink to="/add" className="nav-link">Add Movie</NavLink>
              <span className="nav-user">{user.name}</span>
              <button onClick={handleLogout} className="nav-link nav-btn">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/register" className="nav-link">Register</NavLink>
            </>
          )}
          <NavLink to="/about" className="nav-link">About</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
