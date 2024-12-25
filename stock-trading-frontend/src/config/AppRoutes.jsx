import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Stocks from "../pages/Stocks";
import PortfolioPage from "../pages/PortfolioPage";
import AuthForm from "../pages/AuthForm.jsx";
import App from "../App.jsx";
import Backtesting from "../components/Backtesting.jsx";
import EducationalTools from "../components/EducationalTools.jsx";
export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/backtesting" element={<Backtesting />} />
        <Route path="/educational" element={<EducationalTools />} />
      </Routes>
    </>
  );
}
