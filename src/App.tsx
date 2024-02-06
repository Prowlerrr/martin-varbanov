import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';
import ArtworkShowcase from "./components/ArtworkShowcase";
import AchievementGallery from "./components/AchievementGallery";
import Blog from "./components/Blog";
import About from "./components/About";
import Games from "./components/Games";
import EducationCorner from "./components/EducationCorner";
import Comments from "./components/Comments";

const App = () => {
    return (
        <Router>
            <div>
                <Navbar bg="light" variant="light" className="justify-content-center">
                    <Nav className="mr-auto justify-content-center" style={{maxWidth: '800px'}}>
                        <Nav.Link as={Link} to="/" className="mx-3">Home</Nav.Link>
                        <Nav.Link as={Link} to="/achievements" className="mx-3">Achievements Gallery</Nav.Link>
                        <Nav.Link as={Link} to="/artwork" className="mx-3">Artwork Showcase</Nav.Link>
                        <Nav.Link as={Link} to="/games" className="mx-3">Games</Nav.Link>
                        <Nav.Link as={Link} to="/education" className="mx-3">Education Corner</Nav.Link>
                        <Nav.Link as={Link} to="/comments" className="mx-3">Comments</Nav.Link>
                        <Nav.Link as={Link} to="/blog" className="mx-3">Blog</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="mx-3">About</Nav.Link>
                    </Nav>
                </Navbar>
                <Container className='d-flex justify-content-center'>
                    <Routes>
                        <Route path='/' element={<h1>Home Page</h1>} />
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