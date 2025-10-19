import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import {
  Home,
  Learn,
  Blog,
  About,
  Contact,
  LessonDetail,
  NotFound,
} from './pages';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:id" element={<LessonDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
