import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/MainPage";
import DicePageDefault from "./pages/DicePageDefault";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/dicedefault" element={<DicePageDefault />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
