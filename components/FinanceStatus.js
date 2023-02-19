import React, { useEffect, useState } from "react";
import FinanceCalc from "./FinanceCalc";

const FinanceInput = () => {
  const typeSwitch = {
    income: {
      text: "Приход:",
      totalSums: [
        {
          price: 100,
          reason: "No reason",
        },
      ],
    },
    expense: {
      text: "Разход:",
      totalSums: [
        {
          price: 20,
          reason: "No reason",
        },
      ],
    },
  };
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    const totalIncome = typeSwitch.income.totalSums.reduce(
      (x, y) => x + y.price,
      0
    );
    const totalExpense = typeSwitch.expense.totalSums.reduce(
      (x, y) => x + y.price,
      0
    );
    setTotalSum(totalIncome - totalExpense);
  }, [typeSwitch]);
  return (
    <div className="grid items-center justify-center grid-cols-2 gap-x-10">
      <FinanceCalc
        text={typeSwitch.income.text}
        totalSums={typeSwitch.income.totalSums}
      />
      <FinanceCalc
        text={typeSwitch.expense.text}
        totalSums={typeSwitch.expense.totalSums}
      />

      <div>Останали пари за месеца: {totalSum}</div>
    </div>
  );
};

export default FinanceInput;
