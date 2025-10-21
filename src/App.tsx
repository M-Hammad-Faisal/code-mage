import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout, ScrollToTop } from './components';

// Lazy load page components for better performance
const Home = lazy(async () =>
  import('./pages/Home').then(module => ({ default: module.Home }))
);
const Learn = lazy(async () =>
  import('./pages/Learn').then(module => ({ default: module.Learn }))
);
const Blog = lazy(async () =>
  import('./pages/Blog').then(module => ({ default: module.Blog }))
);
const About = lazy(async () =>
  import('./pages/About').then(module => ({ default: module.About }))
);
const Contact = lazy(async () =>
  import('./pages/Contact').then(module => ({ default: module.Contact }))
);
const LessonDetail = lazy(async () =>
  import('./pages/LessonDetail').then(module => ({
    default: module.LessonDetail,
  }))
);
const BlogDetail = lazy(async () =>
  import('./pages/BlogDetail').then(module => ({
    default: module.BlogDetail,
  }))
);
const NotFound = lazy(async () => import('./pages/NotFound'));

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
