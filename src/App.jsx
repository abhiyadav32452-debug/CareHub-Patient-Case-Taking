import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PatientDashboard from "./pages/PatientDashboard";
import CheckIn from "./pages/CheckIn";
import Interview from "./pages/Interview";
import Documents from "./pages/Documents";
import CaseSummary from "./pages/CaseSummary";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorCaseReview from "./pages/DoctorCaseReview";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/patient" element={<PatientDashboard />} />
      <Route path="/check-in" element={<CheckIn />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/case-summary" element={<CaseSummary />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/case/:id" element={<DoctorCaseReview />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}