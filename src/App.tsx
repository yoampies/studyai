import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./sections/Home'));
const Upload = lazy(() => import('./sections/Upload'));
const DocDetails = lazy(() => import('./sections/DocDetails'));
const History = lazy(() => import('./sections/History'));

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-white">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#607afb] border-t-transparent"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary componentName="App Shell">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/details/:analysisId" element={<DocDetails />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
