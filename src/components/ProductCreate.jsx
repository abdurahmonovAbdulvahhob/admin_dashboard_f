import React, { useEffect, useState } from "react";
import { request } from "@/api";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "./BackButton";

const ProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
    stock: "",
    average_rating: 0,
  });
  const [categories, setCategories] = useState([]);
  const token = useSelector((s) => s.token.value);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    request
      .get("/product-category/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));

    if (id) {
      request
        .get(`/product/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProduct({
            ...res.data,
            price: Number(res.data.price),
            categoryId: Number(res.data.categoryId) || "",
            stock: Number(res.data.stock),
            average_rating: Number(res.data.average_rating) || 0, 
          });
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { average_rating, ...productData } = product;
    console.log(product.average_rating);

    const endpoint = id ? `/product/update/${id}` : "/product/create";

    try {
      const response = await request({
        method: id ? "PATCH" : "POST",
        url: endpoint,
        data: {...productData,average_rating:0}, 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Product saved:", response.data);
      navigate("/admin/manage-product");
    } catch (err) {
      console.error(err);
      setError("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 to-indigo-500 p-6">
      <div className="bg-white shadow-lg rounded-xl px-10 py-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {id ? "Edit Product" : "Create Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            name="description"
            placeholder="Product Description"
            rows="4"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            required
          ></textarea>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) })
            }
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            required
          />
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            name="categoryId"
            value={product.categoryId}
            onChange={(e) =>
              setProduct({ ...product, categoryId: parseInt(e.target.value) })
            }
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={product.stock}
            onChange={(e) =>
              setProduct({ ...product, stock: parseInt(e.target.value) })
            }
            required
          />
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <div className="flex justify-between items-center">
            <BackButton />
            <button
              type="submit"
              className={`py-2 px-4 rounded-md text-white font-semibold ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition-colors`}
              disabled={loading}
            >
              {loading ? "Saving..." : id ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;
