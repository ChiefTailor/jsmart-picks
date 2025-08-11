import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from '../src/Pages/Home';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Packages from "./Pages/Packages";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} newestOnTop />
      <Router>
        <ScrollToTop /> {/* Triggers scroll to top on route change */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
