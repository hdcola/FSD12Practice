import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home1 from "./pages/Home1";
import Result from "./pages/Result";
import Chat from "./pages/Chat";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/result" element={<Result />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
