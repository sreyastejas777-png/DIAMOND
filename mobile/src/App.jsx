import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './layout/Layout';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Technology from './pages/Technology';
import Applications from './pages/Applications';
import WorkingProcess from './pages/WorkingProcess';
import Contact from './pages/Contact';
import GetQuote from './pages/GetQuote';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Unmount the loading screen after 1.8 seconds (gives time for internal animation)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen show={isLoading} />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/process" element={<WorkingProcess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<GetQuote />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
