import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

const Products = ({ data, onEdit, onDelete, isAdmin }) => {
  const reversedData = data?.slice().reverse();

  const productItems = reversedData?.map((product) => (
    <div
      key={product.id}
      className="w-80 p-4 border border-gray-300 dark:border-none bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow  transform hover:scale-105"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-contain rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold dark:text-white">{product.name}</h3>
      <p className="text-md dark:text-white dark:font-bold text-gray-700 mt-2 font-medium">
        {product.price}{" "}
        <span className="text-md text-green-600 mt-2 font-medium">USD</span>
      </p>
      {isAdmin ? (
        <div className="flex justify-between mt-4">
          <MdOutlineEdit
            onClick={() => onEdit(product.id)}
            className="text-xl text-blue-600 cursor-pointer hover:text-blue-800 transition-all duration-200"
          />

          <FaRegTrashCan
            onClick={() => onDelete(product.id)}
            className="text-xl text-red-600 cursor-pointer hover:text-red-800 transition-all duration-200"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  ));

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {productItems?.length ? (
        productItems
      ) : (
        <p className="text-lg text-gray-600">No products available.</p>
      )}
    </div>
  );
};

export default Products;
