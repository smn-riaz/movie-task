import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SingleMoviePage from "./Pages/LandingPage/SingleMoviePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/:id" element={<SingleMoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
