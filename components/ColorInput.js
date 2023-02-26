import React, { useState } from "react";

const ColorInput = ({
  labelName,
  isLoading = false,
  btnName = "Изпрати",
  wrongText = "Не правилно име.",
  input,
  setInput,
  state,
  name,
  onClick,
  type = "text",
  isBtn = true,
}) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="error"
          className={`block mb-2 text-sm font-medium ${
            state == "wrong" && "text-red-700 dark:text-red-500"
          }`}
        >
          {labelName}
        </label>
        <input
          value={input}
          onChange={setInput}
          type={type}
          name={name}
          id="error"
          className={` border border-slate-900  text-sm rounded-lg
 dark:bg-gray-700  block w-full p-2.5 ${
   state == "wrong" &&
   "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
 }`}
        />
        {state == "wrong" && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Опа!</span> {wrongText}.
          </p>
        )}
      </div>

      {isBtn && (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onClick}
        >
          {isLoading ? <div className="loader"></div> : btnName}
        </button>
      )}
    </>
  );
};

export default ColorInput;
