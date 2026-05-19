import { useAuth } from '../context/AuthContext';

function About() {
  const { user } = useAuth();
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>About Movies Explorer</h1>
        {user && <p className="user-id">Your User ID: <code>{user._id}</code></p>}
        <p>A full-stack MERN application for managing your personal movie collection.</p>
        <h2>Tech Stack</h2>
        <div className="tech-grid">
          <div className="tech-item">React.js</div>
          <div className="tech-item">Node.js</div>
          <div className="tech-item">Express.js</div>
          <div className="tech-item">MongoDB</div>
          <div className="tech-item">Mongoose</div>
          <div className="tech-item">React Router</div>
        </div>
        <h2>Features</h2>
        <ul>
          <li>User registration & login with session-based auth</li>
          <li>Password hashing with bcrypt</li>
          <li>User-specific movie CRUD operations</li>
          <li>Server-side authorization (users can only edit/delete their own movies)</li>
          <li>Custom middleware for POST request logging</li>
          <li>Search by title or director</li>
          <li>Sort by title, year, or rating</li>
          <li>Responsive design</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
