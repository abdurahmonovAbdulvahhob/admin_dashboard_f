import { request } from "@/api";
import React from "react";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/slices/token-slice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let user = Object.fromEntries(formData);

    console.log(user);

    request.post("/auth/signup-admin", user).then((res) => {
      console.log(res);
      dispatch(signIn(res.data.access_token));
      navigate("/admin");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Sign Up
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Create your account to access the admin panel.
        </p>
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              placeholder="Name"
              required
            />
          </div>
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
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
