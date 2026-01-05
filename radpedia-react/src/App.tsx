import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import FORCalculator from './pages/FORCalculator';
import LegLengthCalculator from './pages/LegLengthCalculator';
import LiverSpleenCalculator from './pages/LiverSpleenCalculator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="liver-spleen" element={<LiverSpleenCalculator />} />
          <Route path="leg-length" element={<LegLengthCalculator />} />
          <Route path="for-ratio" element={<FORCalculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
