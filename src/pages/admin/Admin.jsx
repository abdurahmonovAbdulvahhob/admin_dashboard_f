import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div id="admin" className="flex">
      <div className="w-80 h-screen bg-gray-800 p-6 text-white sticky top-0 left-0">
        <NavLink to={"/"} className="block text-2xl font-bold mb-6">
          Dashboard
        </NavLink>
        <ul className="space-y-4">
          <li>
            <NavLink
              className={({ isActive }) =>
                `block p-3 rounded-md transition-colors duration-200 text-lg ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "hover:bg-slate-100 hover:text-slate-900"
                }`
              }
              to={"create-product"}
            >
              Create Product
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `block p-3 rounded-md transition-colors duration-200 text-lg ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "hover:bg-slate-100 hover:text-slate-900"
                }`
              }
              to={"manage-product"}
            >
              Manage Product
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `block p-3 rounded-md transition-colors duration-200 text-lg ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "hover:bg-slate-100 hover:text-slate-900"
                }`
              }
              to={"create-category"}
            >
              Create Category
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `block p-3 rounded-md transition-colors duration-200 text-lg ${
                  isActive ? "bg-slate-100 text-slate-900" : "hover:bg-slate-100 hover:text-slate-900"
                }`
              }
              to={"manage-category"}
            >
              Manage Category
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 bg-gray-100 dark:bg-slate-500">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
