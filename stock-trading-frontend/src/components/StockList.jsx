/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import stockSymbolsList from "../helper/stockList";
import toast from "react-hot-toast";
import AxiosHelper from "../config/AxiosHelper";

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state
  const stockSymbols = stockSymbolsList();

  // Fetch real-time stock data periodically
  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true); // Start loader
      try {
        const stockData = [];
        for (const sym of stockSymbols) {
          const response = await AxiosHelper.get(
            `http://localhost:9909/api/stocks/real-time/${sym.symbol}`
          );
          const data = response.data;
          stockData.push({
            symbol: data.data[0].symbol,
            name: sym.name,
            open: data.data[0].open, // Current price
            high: data.data[0].high, // High value
            low: data.data[0].low, // Low value
            volume: data.data[0].volume, // Volume of trades
          });
        }
        setStocks(stockData);
      } catch (err) {
        console.error("Error fetching stock data:", err);
        toast.error("Error fetching stock data.");
      } finally {
        setLoading(false); // Stop loader after fetching
      }
    };

    fetchStockData();
  }, []);

  // Handle quantity input change
  const handleQuantityChange = (symbol, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [symbol]: quantity,
    }));
  };

  // Buy stocks
  const buyStock = (symbol, price) => {
    const quantityValue = parseInt(quantities[symbol] || 0, 10);

    if (quantityValue <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    const portfolioEntry = {
      userEmail: localStorage.getItem("username"), // Replace with the user's email
      stockSymbol: symbol,
      quantity: quantityValue,
      totalPrice: price * quantityValue, // Calculate the total price based on the stock price and quantity
    };

    AxiosHelper.post(
      "http://localhost:9909/api/portfolio/addToPortfolio",
      portfolioEntry
    )
      .then(() => {
        toast.success(
          `${quantityValue} share(s) of ${symbol} bought successfully!`
        );
        setQuantities((prev) => ({
          ...prev,
          [symbol]: "", // Reset quantity input after purchase
        }));
      })
      .catch((err) => {
        console.error("Error buying stock:", err);
      });
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-lg shadow-lg text-white mb-6 text-center">
        <h1 className="text-3xl font-bold animate-fade-in">
          Real-Time Stock List
        </h1>
        <p className="text-lg mt-2">
          Stay updated with live stock prices and start trading now!
        </p>
      </div>

      {/* Loader Section */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table-auto w-full bg-white border-collapse animate-slide-in rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-4 py-2 text-left">Symbol</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">High</th>
                <th className="border px-4 py-2 text-left">Low</th>
                <th className="border px-4 py-2 text-left">Volume</th>
                <th className="border px-4 py-2 text-left">Quantity</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="border px-4 py-2 font-semibold">
                    {stock.symbol}
                  </td>
                  <td className="border px-4 py-2">{stock.name}</td>
                  <td className="border px-4 py-2">${stock.open.toFixed(2)}</td>
                  <td className="border px-4 py-2">${stock.high.toFixed(2)}</td>
                  <td className="border px-4 py-2">${stock.low.toFixed(2)}</td>
                  <td className="border px-4 py-2">{stock.volume}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      min="1"
                      value={quantities[stock.symbol] || ""}
                      onChange={(e) =>
                        handleQuantityChange(stock.symbol, e.target.value)
                      }
                      className="border rounded px-2 py-1 w-full"
                      placeholder="Qty"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => buyStock(stock.symbol, stock.open)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transform transition-all duration-200 hover:scale-105"
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockList;
