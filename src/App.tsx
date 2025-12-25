import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './sections/Home';
import Upload from './sections/Upload';

const DocDetails = lazy(() => import('./sections/DocDetails'));
const History = lazy(() => import('./sections/History'));

const PageLoader = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#607afb] border-t-transparent"></div>
    <p className="mt-4 font-medium text-[#6e6388]">Loading section...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/details/:analysisId" element={<DocDetails />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
