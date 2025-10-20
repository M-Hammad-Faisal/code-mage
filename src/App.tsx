import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Layout, ScrollToTop } from './components';

// Lazy load page components for better performance
const Home = lazy(() =>
  import('./pages/Home').then(module => ({ default: module.Home }))
);
const Learn = lazy(() =>
  import('./pages/Learn').then(module => ({ default: module.Learn }))
);
const Blog = lazy(() =>
  import('./pages/Blog').then(module => ({ default: module.Blog }))
);
const About = lazy(() =>
  import('./pages/About').then(module => ({ default: module.About }))
);
const Contact = lazy(() =>
  import('./pages/Contact').then(module => ({ default: module.Contact }))
);
const LessonDetail = lazy(() =>
  import('./pages/LessonDetail').then(module => ({
    default: module.LessonDetail,
  }))
);
const BlogDetail = lazy(() =>
  import('./pages/BlogDetail').then(module => ({
    default: module.BlogDetail,
  }))
);
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:id" element={<LessonDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
