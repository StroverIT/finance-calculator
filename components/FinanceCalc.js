import React, { useState } from "react";
import ColorInput from "./ColorInput";

const FinanceCalc = ({ text, totalSums }) => {
  console.log(text == "Разход:");
  const [input, setInput] = useState("");
  return (
    <div>
      <h1 className="mb-2 text-xl font-bold">{text} </h1>

      <ColorInput
        labelName="Сума:"
        btnName="Добави"
        input={input}
        setInput={setInput}
      />
      <div className={`mt-10 ${text == "Разход:" && "text-red-500"}`}>
        {totalSums.map((sum) => {
          return (
            <div key={sum.reason}>
              {sum.price} - {sum.reason}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinanceCalc;
