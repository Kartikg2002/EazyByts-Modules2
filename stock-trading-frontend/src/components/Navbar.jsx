import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Clear localStorage and show toast notification
      localStorage.clear();
      toast.success("Successfully logged out!");

      // Redirect to login page after a delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-bold">Stock Trading</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/stocks" className="hover:underline">
            Stocks
          </Link>
          <Link to="/portfolio" className="hover:underline">
            Portfolio
          </Link>
          {localStorage.getItem("token") && (
            <>
              <Link to="/backtesting" className="hover:underline">
                Backtesting
              </Link>
              <Link to="/educational" className="hover:underline">
                Educational Tools
              </Link>
              <Link onClick={handleLogout} className="hover:underline">
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
