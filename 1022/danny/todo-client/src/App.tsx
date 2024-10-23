import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Menu } from './components/menu';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { NewTodoForm } from './pages/newTodo';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new" element={<NewTodoForm />} />
      </Routes>
    </Router>
  );
}

export default App;
