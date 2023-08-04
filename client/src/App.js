import DoctorSignUp from "./pages/DoctorSignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PatientSignUp from "./pages/PatientSignup";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/doctor" element={<DoctorSignUp />} />
          <Route path="/register/patient" element={<PatientSignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
