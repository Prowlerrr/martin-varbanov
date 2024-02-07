import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';
import ArtworkShowcase from "./components/ArtworkShowcase/ArtworkShowcase";
import AchievementGallery from "./components/AchievementsGallery/AchievementGallery";
import Blog from "./components/Blog/Blog";
import About from "./components/About/About";
import Games from "./components/Games/Games";
import EducationCorner from "./components/EducationCorner/EducationCorner";
import Comments from "./components/Comments/Comments";
import AchievementsGallery from "./components/AchievementsGallery/AchievementGallery";
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';

const App = () => {
    const { t } = useTranslation();
    return (
        <Router>
            <div>
                <Navbar bg="light" variant="light" className="justify-content-center">
                    <Nav className="mr-auto justify-content-center" style={{maxWidth: '800px'}}>
                        <Nav.Link as={Link} to="/" className="mx-3">{t('nav.home')}</Nav.Link>
                        <Nav.Link as={Link} to="/achievements" className="mx-3">{t('nav.achievements')}</Nav.Link>
                        <Nav.Link as={Link} to="/artwork" className="mx-3">{t('nav.artwork')}</Nav.Link>
                        <Nav.Link as={Link} to="/games" className="mx-3">{t('nav.games')}</Nav.Link>
                        <Nav.Link as={Link} to="/education" className="mx-3">{t('nav.education')}</Nav.Link>
                        <Nav.Link as={Link} to="/comments" className="mx-3">{t('nav.comments')}</Nav.Link>
                        <Nav.Link as={Link} to="/blog" className="mx-3">{t('nav.blog')}</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="mx-3">{t('nav.about')}</Nav.Link>
                    </Nav>
                    <LanguageSwitcher style={{ marginLeft: 20 , width: "60px"}} />
                </Navbar>
                <Container className='d-flex justify-content-center'>
                    <Routes>
                        <Route path='/' element={<h1>{t('homepage')}</h1>} />
                        <Route path='/achievements' element={<AchievementGallery />} />
                        <Route path='/artwork' element={<ArtworkShowcase />} />
                        <Route path='/games' element={<Games />} />
                        <Route path='/education' element={<EducationCorner />} />
                        <Route path='/comments' element={<Comments />} />
                        <Route path='/blog' element={<Blog />} />
                        <Route path='/about' element={<About />} />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
};

export default App;