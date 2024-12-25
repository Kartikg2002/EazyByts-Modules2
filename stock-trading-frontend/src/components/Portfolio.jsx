import { useEffect, useState } from "react";
import AxiosHelper from "../config/AxiosHelper";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    AxiosHelper.get("/portfolio/test@example.com")
      .then((res) => {
        setPortfolio(res.data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((err) => {
        console.error("Error fetching portfolio:", err);
        setLoading(false); // Stop loading on error
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Makes the container take up the full height of the screen */}
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Your Portfolio
        </h2>

        {loading ? (
          // Loader animation while data is being fetched
          <div className="flex justify-center items-center h-40">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {portfolio.length > 0 ? (
              <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <th className="border px-6 py-3 text-left font-semibold">
                      Stock Symbol
                    </th>
                    <th className="border px-6 py-3 text-left font-semibold">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((entry, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-blue-100 transition duration-300 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="border px-6 py-4 text-gray-800 font-medium">
                        {entry.stockSymbol}
                      </td>
                      <td className="border px-6 py-4 text-gray-600">
                        {entry.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center mt-8 text-gray-500">
                <p>No stocks in your portfolio yet!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
