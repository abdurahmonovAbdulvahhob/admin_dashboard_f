import { request } from "@/api";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/slices/token-slice";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target);
    const user = Object.fromEntries(formData);

    request
      .post("/auth/signin-admin", user)
      .then((res) => {
        dispatch(signIn(res.data.access_token));
        navigate("/admin/manage-product");
      })
      .catch((err) => {
        alert(err.response.data.message.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Sign In
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Login to access the admin panel.
        </p>
        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex gap-6">
            <BackButton />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
