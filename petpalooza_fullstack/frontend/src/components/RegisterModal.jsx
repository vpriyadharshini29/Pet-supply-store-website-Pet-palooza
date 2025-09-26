import { useState } from "react";
import API from "../api";

export default function RegisterModal({ setShowRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await API.post("user/register/", {
        username,
        email,
        password,
      });
      alert(res.data.message || "Account created! You can now log in.");
      setShowRegister(false);
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        alert("Error creating account");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg overflow-hidden">
        {/* Modal header with green background + close button */}
        <div className="bg-green-300 flex justify-between items-center px-4 py-2">
          <h2 className="font-bold text-sm">
            Sign up for a free account at Petpalooza.
          </h2>
          <button
            onClick={() => setShowRegister(false)}
            className="text-black font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="border p-2 rounded w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.join(", ")}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.join(", ")}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.join(", ")}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded font-semibold"
          >
            Create an account
          </button>

          {errors.non_field_errors && (
            <p className="text-red-500 text-sm mt-1">
              {errors.non_field_errors.join(", ")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
