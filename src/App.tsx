import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { Home, Learn, Blog, About, Contact, LessonDetail } from './pages';

function App() {
  // Set basename for GitHub Pages deployment
  const basename = import.meta.env.PROD ? '/code-mage' : '';

  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:id" element={<LessonDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
