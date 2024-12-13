import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const token = useSelector((s) => s.token.value);
  const activeClass = "text-blue-500 border-b-2 border-blue-500";

  return (
    <header className="bg-blue-900 dark:bg-slate-900 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">
          <NavLink to="/" className="hover:text-blue-500">
            E-commerce
          </NavLink>
        </h1>
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? activeClass : ""}`
            }
          >
            Home
          </NavLink>
 
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? activeClass : ""}`
            }
          >
            Register
          </NavLink>
          {token ? (
            <NavLink
              to={"/admin/manage-product"}
              className={({ isActive }) =>
                `hover:text-blue-400 ${isActive ? activeClass : ""}`
              }
            >
              Admin
            </NavLink>
          ) : (
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                `hover:text-blue-400 ${isActive ? activeClass : ""}`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
