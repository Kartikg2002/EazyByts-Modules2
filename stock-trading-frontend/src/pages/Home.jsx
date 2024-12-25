import myImage from "../assets/stockImage.jpg";
const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 animate-zoom-in">
            Welcome to Stock Trading Simulator
          </h1>
          <p className="text-lg md:text-2xl mt-6 font-medium animate-slide-in">
            Practice trading strategies, explore real-time market trends, and
            manage your portfolio risk-free!
          </p>
        </div>
        <div className="mt-12 animate-bounce">
          <button className="px-6 py-3 rounded-lg text-lg bg-green-500 hover:bg-green-600 transition-transform duration-300 hover:scale-105">
            <a href="/stocks">Get Started</a>
          </button>
        </div>
      </div>

      {/* Stock Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto px-6 py-12">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={myImage}
            alt="Stock Trading"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform w-full sm:w-96 h-auto mx-auto duration-300"
          />
        </div>

        {/* Message */}
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Learn, Trade, and Grow
          </h2>
          <p className="text-lg font-light">
            Our platform allows you to simulate real-world stock trading using
            live market data. Hone your skills before stepping into the real
            markets.
          </p>
          <ul className="list-disc list-inside text-left space-y-2">
            <li>Real-time stock updates</li>
            <li>Risk-free trading environment</li>
            <li>Advanced portfolio management tools</li>
          </ul>
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

export default Home;
