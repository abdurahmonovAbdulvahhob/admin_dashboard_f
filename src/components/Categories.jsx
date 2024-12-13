// src/components/Categories.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

const Categories = ({ data, onEdit, onDelete }) => {
  const navigate = useNavigate();


  const categoryItems = data?.map((category) => (
    <div
      key={category.id}
      className="w-80 p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between"
    >
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          Title: {category.name}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Description: {category.description}
        </p>
      </div>
      <div className="flex justify-between items-center space-x-2 mt-4">
        <button
          onClick={() => onEdit(category.id)}
          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-center"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="flex-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-center"
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <div className="container mx-auto mt-5">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="flex gap-4 flex-wrap justify-center">{categoryItems}</div>
    </div>
  );
};

export default Categories;
