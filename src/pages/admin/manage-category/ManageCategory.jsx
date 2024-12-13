import React, { useEffect, useState } from "react";
import { request } from "../../../api"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../../../components/Categories";

const ManageCategory = () => {
  const [category, setCategory] = useState([]);
  const token = useSelector((s) => s.token.value);
  const navigate = useNavigate();

  const fetchCategories = () => {
    request
      .get("/product-category/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCategory(res.data))
      .catch((error) => console.error("Error fetching category:", error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/create-category/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      request
        .delete(`/product-category/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log("Category deleted successfully.");
          fetchCategories();
        })
        .catch((error) => console.error("Error deleting category:", error));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-700">
            Categories
          </h1>
          <button
            onClick={() => navigate("/admin/create-category")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Add Category
          </button>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-8">
          {category.length > 0 ? (
            <Categories
              data={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <p className="text-gray-600 text-center">
              No categories available. Click the "Add Category" button to create
              one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
