import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<h1>Contact</h1>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
