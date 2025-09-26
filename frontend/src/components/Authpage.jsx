import { useState, useEffect } from "react";
import Login from "./Login";
import RegisterModal from "./RegisterModal";
import { jwtDecode } from "jwt-decode";

export default function AuthPage() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username });
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      {!user ? (
        <div className="bg-white shadow rounded-lg w-[800px]">
          {/* Green header with sections */}
          <div className="flex">
            <div className="w-1/2 bg-green-300 text-center py-3 font-bold border-r border-gray-200">
              Returning customer
            </div>
            <div className="w-1/2 bg-green-300 text-center py-3 font-bold">
              New customer
            </div>
          </div>

          <div className="flex">
            {/* Login (left side) */}
            <div className="w-1/2 p-6 border-r border-gray-200">
              <Login setUser={setUser} />
              <p className="text-sm text-gray-500 mt-2 cursor-pointer">
                Forget your password?
              </p>
            </div>

            {/* Register button (right side) */}
            <div className="w-1/2 p-6 flex flex-col items-center justify-center">
              <p className="text-gray-600 mb-4 text-sm text-center">
                Register with us for a faster checkout, to track the status of
                your order and more.
              </p>
              <button
                onClick={() => setShowRegister(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded font-semibold"
              >
                Create an account
              </button>
              <p className="text-gray-400 text-sm mt-4">Or</p>
            </div>
          </div>

          {showRegister && <RegisterModal setShowRegister={setShowRegister} />}
        </div>
      ) : (
        <div className="bg-white shadow p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
