/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosHelper from "../config/AxiosHelper";
import myImage2 from "../assets/stockImage2.jpg";
import myImage3 from "../assets/stockImage3.jpg";
import myImage4 from "../assets/stockImage4.jpg";
import myImage5 from "../assets/stockImage5.jpg";
import { isTokenExpired } from "../services/LoginService";

const Backtesting = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [initialInvestment, setInitialInvestment] = useState("");
  const [strategy, setStrategy] = useState("buy-and-hold");
  const [backtestResult, setBacktestResult] = useState(null);
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

  const handleBacktest = async () => {
    if (!stockSymbol || !initialInvestment) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await AxiosHelper.post("/stocks/backtest", {
        stockSymbol,
        initialInvestment: parseFloat(initialInvestment),
        strategy,
      });

      setBacktestResult(response.data);
      toast.success("Backtest completed successfully!");
    } catch (error) {
      console.error("Error during backtesting:", error);
      toast.error("Failed to run backtest.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-lg shadow-lg text-white mb-6">
          <h2 className="text-3xl font-bold text-center">Backtesting Tool</h2>
          <p className="text-center mt-2 text-lg">
            Simulate your trading strategy performance using historical stock
            data to make informed decisions.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-center mb-4">Enter Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Stock Symbol (e.g., AAPL)"
              value={stockSymbol}
              onChange={(e) => setStockSymbol(e.target.value)}
              className="border rounded px-4 py-2"
            />
            <input
              type="number"
              placeholder="Initial Investment ($)"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="border rounded px-4 py-2"
            />
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="border rounded px-4 py-2"
            >
              <option value="buy-and-hold">Buy and Hold</option>
              <option value="momentum-trading">Momentum Trading</option>
              <option value="mean-reversion">Mean Reversion</option>
              <option value="moving-average">Moving Average Crossover</option>
            </select>
          </div>
          <button
            onClick={handleBacktest}
            className="bg-blue-500 text-white px-6 py-2 mt-4 rounded hover:bg-blue-600 transition w-full"
          >
            Run Backtest
          </button>
        </div>

        {/* Backtest Results */}
        {backtestResult && (
          <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center text-green-700">
              Backtest Results
            </h3>
            <p className="text-center text-gray-600 mt-2 mb-4">
              Insights from your strategy performance
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-lg font-semibold">Initial Investment:</p>
                <p className="text-2xl font-bold text-green-700">
                  ${backtestResult.initialInvestment}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-lg font-semibold">Final Value:</p>
                <p className="text-2xl font-bold text-green-700">
                  ${backtestResult.finalValue.toFixed(2)}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-lg font-semibold">Profit/Loss:</p>
                <p
                  className={`text-2xl font-bold ${
                    backtestResult.profitLoss >= 0
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  ${backtestResult.profitLoss.toFixed(2)}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-lg font-semibold">Profit Percentage:</p>
                <p
                  className={`text-2xl font-bold ${
                    backtestResult.profitPercentage >= 0
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {backtestResult.profitPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded text-white text-center">
              <p>
                Investing in <span className="font-bold">{stockSymbol}</span>{" "}
                with the "{strategy}" strategy could yield the above results.
                Modify your strategy for better outcomes!
              </p>
            </div>
          </div>
        )}

        {/* Additional Trading Info */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-[2rem] font-bold text-center mb-8">
            Stock Related Fact's
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg p-4 shadow">
              <h4 className="font-bold text-lg">The First Stock Exchange</h4>
              <p>
                The world's first stock exchange was established in Amsterdam in
                1602 by the Dutch East India Company, allowing people to buy and
                sell shares for the first time.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow">
              <h4 className="font-bold text-lg">The Most Expensive Stock</h4>
              <p>
                Berkshire Hathaway, led by Warren Buffett, has the most
                expensive stock in the world, with its Class A shares trading at
                over $500,000 per share (as of 2024).
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow">
              <h4 className="font-bold text-lg">
                {" "}
                The Stock Market’s Opening Bell
              </h4>
              <p>
                The New York Stock Exchange (NYSE) has a famous tradition of
                ringing the opening and closing bell, a practice that began in
                the late 1800s to signal the start and end of trading sessions.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow">
              <h4 className="font-bold text-lg">The Longest Bull Market</h4>
              <p>
                The longest bull market in history lasted from March 2009 to
                February 2020, fueled by low interest rates and economic
                recovery after the 2008 financial crisis.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow">
              <h4 className="font-bold text-lg">
                Stock Prices Move in Microseconds
              </h4>
              <p>
                Stock trades on modern exchanges happen at incredible
                speeds—microseconds, thanks to high-frequency trading
                algorithms.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow">
              <h4 className="font-bold text-lg">
                The S&P 500 Covers 80% of U.S. Market Value
              </h4>
              <p>
                The S&P 500 index includes 500 of the largest U.S. companies and
                accounts for about 80% of the total market capitalization of
                U.S. equities.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-10 bg-gradient-to-br from-blue-400 to-blue-700 p-6 rounded-lg text-white text-center">
          <h3 className="text-xl font-bold">
            Take Your Trading to the Next Level
          </h3>
          <p className="mt-2">
            Use historical data to refine your strategies and make smarter
            trading decisions.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <img
              src={myImage2}
              alt="Trading Simulation"
              className="h-48 w-48 object-cover rounded-lg shadow-lg"
            />
            <img
              src={myImage3}
              alt="Trading Simulation"
              className="h-48 w-48 object-cover rounded-lg shadow-lg"
            />
            <img
              src={myImage4}
              alt="Trading Simulation"
              className="h-48 w-48 object-cover rounded-lg shadow-lg"
            />
            <img
              src={myImage5}
              alt="Trading Simulation"
              className="h-48 w-48 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-16 py-6 bg-gray-800 text-center">
        <p className="text-sm font-light text-gray-400">
          &copy; 2024 Stock Trading Simulator | All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Backtesting;
