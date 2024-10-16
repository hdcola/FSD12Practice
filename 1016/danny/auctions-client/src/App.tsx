import { Routes, Route, useNavigate } from 'react-router-dom';
import { Home } from './pages/home';
import { NextUIProvider } from '@nextui-org/react';
import { Menubar } from './components/menubar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={navigate}>
        <Menubar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
