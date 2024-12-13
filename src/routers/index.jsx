import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/register/Login";
import Register from "../pages/register/Register";
import Admin from "../pages/admin/Admin";
import Auth from "../pages/auth/Auth";
import CreateProduct from "../pages/admin/create-product/CreateProduct";
import ManageProduct from "../pages/admin/manage-product/ManageProduct";
import ManageCategory from "../pages/admin/manage-category/ManageCategory";
import CreateCategory from "../pages/admin/create-category/CreateCategory";
import CategoryCreate from "../components/CategoryCreate";
import ProductCreate from "../components/ProductCreate";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/" element={<Auth />}>
        <Route path="admin" element={<Admin />}>
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="create-product/:id" element={<ProductCreate />} />
          <Route path="manage-product" element={<ManageProduct />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-category/:id" element={<CategoryCreate />} />
          <Route path="manage-category" element={<ManageCategory />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
