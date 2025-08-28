// src/app.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './sections/Home';
import Upload from './sections/Upload';
import DocDetails from './sections/DocDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/details/:analysisId" element={<DocDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;