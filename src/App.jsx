// src/app.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './sections/Home';
import Submit from './sections/Submit';
import DocDetails from './sections/DocDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/details/:analysisId" element={<DocDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;