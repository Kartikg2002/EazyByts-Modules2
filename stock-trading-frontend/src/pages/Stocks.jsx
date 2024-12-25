/* eslint-disable react-hooks/exhaustive-deps */
import StockList from "../components/StockList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../services/LoginService";

const Stocks = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Check if logged in
  useEffect(() => {
    async function isLogin() {
      try {
        if (!token || (await isTokenExpired(token))) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
    isLogin();
  }, []);

  return (
    <>
      <div>
        <StockList />
      </div>
      {/* Footer */}
      <footer className="mt-16 py-6 bg-gray-800 text-center">
        <p className="text-sm font-light text-gray-400">
          &copy; 2024 Stock Trading Simulator | All Rights Reserved
        </p>
      </footer>
    </>
  );
};

export default Stocks;
