import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPageNav from '../components/LandingPageHeader/LandingPageNav';
import LandingPageFooter from '../components/LandingPageFooter/LandingPageFooter';
import Button from '../../ui-components/Button/button';
import Modal from '../../ui-components/Modal/modal';
import './LandingPage.scss';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/Auth/AuthProvider';
import LoginModal from '../components/LandingPageLoginModal/LoginModal';
import SignupModal from '../components/LandingPageSignupModal/SignupModal';

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const screenHeight = window.screen.height;
  const screenWidth = window.screen.width;
  const { user } = useAuthContext();

  const navigate = useNavigate();

  function handleScreenCheck(route) {
    if (screenHeight <= 1024 || screenWidth <= 1366) {
      setShowModal(true);
    } else {
      navigate(`${route}`);
    }
  }

  function handleModalButtonClick(route) {
    setShowModal(false);
    navigate(`${route}`);
  }

  return (
    <>
      <div className="container">
        <LandingPageNav />
      </div>
      
      <section className="hero">
        <div className="container px-4 pt-5 my-5 text-center border-bottom">
          <h1 className="hero-title text-dark">Coming Soon</h1>
          <div className="col-lg-6 mx-auto">
            <p className="hero-subtitle my-4 text-dark">
              Stay tuned for an exciting language learning experience.
            </p>
          </div>
        </div>
      </section>

      <LandingPageFooter showLinks={true} />
    </>
  );
}