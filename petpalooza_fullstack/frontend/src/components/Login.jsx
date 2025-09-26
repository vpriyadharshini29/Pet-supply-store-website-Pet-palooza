import { useState } from "react";
import API from "../api";
import { jwtDecode } from "jwt-decode";

export default function Login({ setUser, setShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const res = await API.post("user/login/", { username, password });
      localStorage.setItem("token", res.data.access);

      const decoded = jwtDecode(res.data.access);

      setUser({
        username: decoded.username,
        email: decoded.email,
        id: decoded.user_id,
      });

      if (setShowLogin) setShowLogin(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Username*</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="border p-2 rounded w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password*</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="border p-2 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded font-semibold"
      >
        Log in
      </button>
    </form>
  );
}
