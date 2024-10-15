import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { NavBar } from './components/navbar';
import { CreateSchedule } from './pages/create-schedule/create-schedule';

function App() {
  return (
    <>
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-schedule" element={<CreateSchedule />} />
            <Route path="/contact" element={<h1>Contact</h1>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
