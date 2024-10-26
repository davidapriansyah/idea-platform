import axios from "axios";
import { useState } from "react";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

export default function Login({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${url}/apis/login`, {
        email,
        password,
      });
      localStorage.setItem("access_token", data.data.access_token);
      navigate("/");
      Toastify({
        text: "Success Login",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200">
        <div className="w-full p-8 mx-auto bg-white rounded-xl shadow-lg max-w-md">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-yellow-600 mb-6">
            Welcome Back!
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Please login to your account.
          </p>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 text-gray-700"
                autoComplete="current-email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 text-gray-700"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full px-4 py-2 bg-black	
-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
