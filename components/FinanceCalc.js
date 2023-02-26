import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ColorInput from "./ColorInput";
import { toastSuccess } from "./notifications/Toast";
import { HiX } from "react-icons/hi";

import { getSession, signOut } from "next-auth/react";

const FinanceCalc = ({ text, totalSums, type, session, typeFinance }) => {
  const router = useRouter();
  const [priceInput, setPriceInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");

  const submitHandler = async () => {
    const res = await fetch("/api/finance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        price: priceInput,
        reason: reasonInput,
        typeFinance,
      }),
    });
    const resData = await res.json();
    if (resData.message) {
      toastSuccess(resData.message);
    }
    setPriceInput("");
    setReasonInput("");
    router.replace(router.asPath);
  };
  const removeHandler = async (stateId) => {
    const res = await fetch("/api/removeFinance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        stateId,
        typeFinance,
      }),
    });
    const resData = await res.json();
    if (resData.message) {
      toastSuccess(resData.message);
    }
    router.replace(router.asPath);
  };
  return (
    <div>
      <h1 className="mb-2 text-xl font-bold">{text} </h1>

      <div className="grid grid-cols-2 gap-x-5">
        <ColorInput
          labelName="Сума:"
          input={priceInput}
          setInput={(e) => setPriceInput(e.target.value)}
          isBtn={false}
        />
        <ColorInput
          labelName="Причина:"
          input={reasonInput}
          setInput={(e) => setReasonInput(e.target.value)}
          isBtn={false}
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={submitHandler}
        >
          Добави
        </button>
      </div>
      <div className={`mt-10 `}>
        {totalSums.map((sum, index) => {
          return (
            <div key={sum._id} className="flex items-center text-lg">
              {sum.price} - {sum.reason}
              <div
                className="mt-1 ml-auto text-xl text-red-500 cursor-pointer "
                onClick={() => removeHandler(sum._id)}
              >
                <HiX />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinanceCalc;
