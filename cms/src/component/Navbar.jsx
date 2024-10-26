import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaListAlt,
  FaThList,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="flex flex-col  sticky top-0 z-10">
      {/* Sidebar */}
      <aside className="w-full bg-gradient-to-b from-blue-300 to-purple-800 text-white shadow-lg p-4 flex justify-between items-center navbar sticky top-0 z-10">
        {/* Logo / Admin Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">Admin Idea</h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4 flex">
          <Link
            to="/"
            className="flex items-center text-lg font-medium hover:bg-yellow-400 hover:text-gray-800 transition-all p-3 rounded-lg"
          >
            <FaHome className="mr-2" /> Home
          </Link>
          <Link
            to="/add"
            className="flex items-center text-lg font-medium hover:bg-yellow-400 hover:text-gray-800 transition-all p-3 rounded-lg"
          >
            <FaPlus className="mr-2" /> Add Product
          </Link>
          <Link
            to="/product"
            className="flex items-center text-lg font-medium hover:bg-yellow-400 hover:text-gray-800 transition-all p-3 rounded-lg"
          >
            <FaListAlt className="mr-2" /> List Product
          </Link>
          <Link
            to="/category"
            className="flex items-center text-lg font-medium hover:bg-yellow-400 hover:text-gray-800 transition-all p-3 rounded-lg"
          >
            <FaThList className="mr-2" /> List Category
          </Link>
          <Link
            to="/register"
            className="flex items-center text-lg font-medium hover:bg-yellow-400 hover:text-gray-800 transition-all p-3 rounded-lg"
          >
            <FaPlus className="mr-2" /> Register User
          </Link>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center text-lg font-medium text-white hover:bg-red-600 bg-red-500 transition-all py-2 px-4 rounded-lg"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </aside>
    </div>
  );
}
