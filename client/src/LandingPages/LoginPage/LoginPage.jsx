import { useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import LandingPageNav from '../components/LandingPageHeader/LandingPageNav';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/Auth/AuthProvider';

export default function LoginPage() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await authService.logIn(inputValue);
      setUser(user);
      navigate('/login-success');
    } catch (error) {
      setErrorMessage('Invalid credentials.');
      setInputValue((inputValue) => {
        const clearedFields = { ...inputValue };
        for (let field in clearedFields) {
          clearedFields[field] = '';
        }
        return clearedFields;
      });
    }
  }

  return (
    <main>
      <LandingPageNav />
      <div className="login-page-login-form-container">
        <div className="login-page-container">
          <form className="login-page-login-form" onSubmit={handleLogin}>
            <div className="login-input-box">
              <input
                type="text"
                name="email"
                value={inputValue.email}
                onChange={handleChange}
                id="login-email" // Update the ID to include "login" prefix
                className="login-page-input"
                placeholder=" " // Add placeholder attribute for spacing
                required
              />
              <label htmlFor="login-email" className="login-label-container">
                <span className="login-label-text">Email/Username:</span>
              </label>
            </div>

            <div className="login-input-box">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="login-password" // Update the ID to include "login" prefix
                value={inputValue.password}
                onChange={handleChange}
                className="login-page-input"
                placeholder=" " // Add placeholder attribute for spacing
                required
              />
              <label htmlFor="login-password" className="login-label-container">
                <span className="login-label-text">Password:</span>
              </label>
              <span
                className="material-symbols-outlined icon"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </div>

            <p>Forgot Password?</p>
            <button type="submit" className="login-page-login-button login-page-button">
              Log In
            </button>
            {errorMessage && <p className="login-error-message">{errorMessage}</p>}
          </form>

          <div className="separator">
            <span>OR</span>
          </div>
          <div className="">
            <button className="google-button login-page-button">
              <img src="/images/google_icon.svg" alt="google sign in" className="google-icon" />
              Sign in with Google
            </button>
          </div>
          <Link to="/signup" className="login-page-signup-link">
            Don't have an account? Sign-Up
          </Link>
        </div>
      </div>
    </main>
  );
}
