import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import RoomsPage from "./pages/RoomsPage";
import Facilities from "./pages/Facilities";
import AuthPage from "./pages/AuthPage";
import Navbar2 from "./components/Navbar2";
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import "./index.css"; // Tailwind's CSS file
// import Admin from "./pages/Admin";
import AdminPage from "./components/AdminPage";
import UserDashboard from "./pages/UserDashboard";
import { AuthProvider } from "./context/Authcontext";
function App() {
  return (
    <>
      {/* Render Navbar on all pages */}
    

      {/* Define Routes */}
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Facilities" element={<Facilities />} />
        <Route path="/RoomsPage" element={<RoomsPage />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        {/* <Route path="/" element={<BookingPage />} /> */}

        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />


      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
