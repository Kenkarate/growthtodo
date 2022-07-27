
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage";
import Welcome from "./Components/Welcome";



function App() {

  return (
    <>
      <div className="App">

        <BrowserRouter basename="/growthtodo">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/homepage" element={<Homepage />} />
          </Routes>
          </BrowserRouter>
         
      </div>
    </>
  );
}

export default App;
