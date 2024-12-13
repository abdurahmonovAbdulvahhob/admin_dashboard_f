import React, { useEffect, useState } from "react";
import { request } from "@/api";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "./BackButton";

const CategoryCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState({ name: "", description: "" });
  const token = useSelector((s) => s.token.value);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      request
        .get(`/product-category/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setCategory(res.data))
        .catch((error) => console.error("Error fetching category:", error));
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = id
      ? `/product-category/update/${id}`
      : "/product-category/create";

    try {
      const response = await request({
        method: id ? "PATCH" : "POST",
        url: endpoint,
        data: category,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Category saved:", response.data);
      navigate("/admin/manage-category");
    } catch (err) {
      console.error(err);
      setError("Failed to save category. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-teal-500">
      <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {id ? "Edit Category" : "Create Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
            type="text"
            name="name"
            placeholder="Category Name"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            required
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
            name="description"
            placeholder="Category Description"
            rows="4"
            value={category.description}
            onChange={(e) =>
              setCategory({ ...category, description: e.target.value })
            }
            required
          ></textarea>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <div className="flex justify-between items-center">
            <BackButton/>
            <button
              type="submit"
              className={`py-2 px-4 rounded-md text-white font-semibold ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } transition-colors`}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : id
                ? "Update Category"
                : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreate;
