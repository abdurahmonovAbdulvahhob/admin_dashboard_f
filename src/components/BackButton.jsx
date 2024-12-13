import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1);
  }
  return (
    <div className="w-36 flex justify-end">
      <button
        type="button"
        onClick={handleBack}
        className="w-[70%] text-gray-700 py-2 hover:px-5 text-xl rounded-md hover:bg-blue-600 hover:w-full hover:text-white duration-500  flex items-center justify-start gap-2"
      >
        <IoMdArrowRoundBack /> Back
      </button>
    </div>
  );
};

export default BackButton;
