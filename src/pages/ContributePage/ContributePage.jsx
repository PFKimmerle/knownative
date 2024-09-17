import { useState } from 'react'
import LandingPageNav from '../../components/LandingPageNav/LandingPageNav';
import LandingPageFooter from '../../components/LandingPageFooter/LandingPageFooter';
import './ContributePage.css';
import coreContributors from './contributordata';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function ContributePage() {
  const [show, setShow] = useState(null); // Change initial state to null
  
  const handleClose = () => setShow(null); // Set show to null on close
  const handleShow = (name) => setShow(name); // Set show to the contributor's name so that only that contributor's modal opens

  return (
    <>
    <div className="container">
      <LandingPageNav />
      <section className="how-to-contribute">
        <div className="how-to-contribute-grid">
          <div className="how-to-contribute-left">
            <h1>How to contribute</h1>
            <p className="about-body">KnowNative is a community-driven project that thrives on the ideas, inspiration and expertise from our contributors. We&apos;re eager to collaborate with community members skilled in software development, UX/UI design, graphic art and illustration, branding, copywriting and content creation. If you have an interest in linguistics or language study, we invite you to join us in shaping KnowNative&apos;s development!</p>
          </div>
          <div className="how-to-contribute-right">
            <ul>
                <li>
                  <span className="li-header">Contribute to the open source project</span>
                  Software developers are welcome to contribute code to the project! Any kind of contribution is meaningful, whether it&apos;s a few lines of CSS to improve some styling or an entirely new feature. To contribute to the open source project, follow the instructions on <a href="https://github.com/AbigailDawson/knownative" target="_blank" rel="noreferrer">GitHub</a> to run KnowNative locally, create your own branch and submit a pull request!
                </li>
                <li>
                  <span className="li-header">Become a Core Contributor</span>
                  Core Contributors are involved in the long-term creative vision for the KnowNative project. We work together as a team to plan and implement new features and improve the app experience for our users. Core Contributors commit to participating in regular team meetings and contribute to the project on a regular consistent basis. If you&apos;re interested in becoming a Core Contributor, please reach out to Abigail on <a href="https://www.linkedin.com/in/abigaildawsondev/" target="_blank" rel="noreferrer">LinkedIn</a>.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="core-contributors">
          <h1>Core Contributors</h1>
          <div className="row">
            {coreContributors.map((contributor) => (
              <div className="col-3" key={contributor.name}>
                <div className="core-container">
                  <Button variant="light" onClick={() => handleShow(contributor.name)} className="btn-outline-secondary">
                    <img src={contributor.image} alt={contributor.name} className="rounded-circle" width="200" height="200" />
                    <div className="contributor-name">
                      <h4>{contributor.name}</h4>
                    </div>
                  </Button>
                  <Modal
                    show={show === contributor.name}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>{contributor.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="grid-example">
                      <Container>
                        <Row>
                          <Col xs={12} md={5}>
                            <img src={contributor.image} alt={contributor.name} width="100%" />
                            <div className="contributor-links">
                              <a rel="noopener noreferrer" href={contributor.linkedin} target="_blank">
                                <img src="/images/linkedin-icon.png" width="32" height="32" alt="LinkedIn" />
                              </a>
                              <a rel="noopener noreferrer" href={contributor.github} target="_blank">
                                <img src="/images/github-icon.png" width="32" height="32" alt="Github" />
                              </a>
                              {contributor.portfolio && (
                                <a rel="noopener noreferrer" href={contributor.portfolio} target="_blank">
                                  <img src="/images/portfolio-icon.png" width="32" height="32" alt="WWW Icon" />
                                </a>
                              )}
                            </div>
                          </Col>
                          <Col xs={12} md={7}>
                            <div dangerouslySetInnerHTML={{ __html: contributor.bio }} />
                          </Col>
                        </Row>
                      </Container>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="contributor-links">
                  <a rel="noopener noreferrer" href={contributor.linkedin} target="_blank">
                    <img src="/images/linkedin-icon.png" width="32" height="32" alt="LinkedIn" />
                  </a>
                  <a rel="noopener noreferrer" href={contributor.github} target="_blank">
                    <img src="/images/github-icon.png" width="32" height="32" alt="Github" />
                  </a>
                  {contributor.portfolio && (
                    <a rel="noopener noreferrer" href={contributor.portfolio} target="_blank">
                      <img src="/images/portfolio-icon.png" width="32" height="32" alt="WWW Icon" />
                    </a>
                  )}
                </div>
              </div>
                  ))}
          </div>
        </section>
        <LandingPageFooter />
      </div>
    </>
  )
}