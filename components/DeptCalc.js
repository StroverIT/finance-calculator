import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ColorInput from "./ColorInput";
import { toastSuccess } from "./notifications/Toast";
import { HiX } from "react-icons/hi";
import DatePickerComp from "./DatePickerComp";

const DeptCalc = ({ text, totalSums, session }) => {
  const router = useRouter();
  const [priceInput, setPriceInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");
  const [personInput, setPersonInput] = useState("");

  const [dateInput, setDateInput] = useState("");

  const submitHandler = async () => {
    const res = await fetch("/api/dept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: priceInput,
        reason: reasonInput,
        person: personInput,
        date: dateInput,
      }),
    });
    const resData = await res.json();
    console.log(resData);

    if (resData.message) {
      toastSuccess(resData.message);
    }
    setPriceInput("");
    setReasonInput("");
    setPersonInput("");
    router.replace(router.asPath);
  };
  const removeHandler = async (stateId) => {
    const res = await fetch("/api/removeDept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stateId,
      }),
    });
    const resData = await res.json();
    if (resData.message) {
      toastSuccess(resData.message);
    }
    router.replace(router.asPath);
  };
  useEffect(() => {
    console.log(dateInput);
  }, [dateInput]);
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-x-5 ">
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
        <ColorInput
          labelName="На кого:"
          input={personInput}
          setInput={(e) => setPersonInput(e.target.value)}
          isBtn={false}
        />
        <div>
          <label htmlFor="" className={`block mb-2 text-sm font-medium `}>
            Дата на връщане
          </label>
          <DatePickerComp setDateInput={setDateInput} />
        </div>
      </div>
      <div className="mt-4">
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
            <div key={sum._id} className="flex items-center text-lg ">
              {sum.price} -
              <span className="break-all whitespace-pre-line max-w-sm px-1">
                {sum.reason}
              </span>
              - {sum.person} - {sum.date}
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

export default DeptCalc;
