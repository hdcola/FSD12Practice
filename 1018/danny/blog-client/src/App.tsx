import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Menu } from './components/menu';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/login';

function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
