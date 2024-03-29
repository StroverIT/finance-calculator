import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import FinanceCalc from "../../components/FinanceCalc";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { getSession } from "next-auth/react";
import Head from "next/head";

import DatePickerComp from "../../components/DatePickerComp";
import User from "../../db/models/User";
import { connectMongo } from "../../db/connectDb";
import getDate from "../../lib/getDate";
import { useRouter } from "next/router";

const FinanceInput = ({ data, session }) => {
  const route = useRouter();

  const [dateInput, setDateInput] = useState(getDate());
  const financeData = data.report;
  const typeFinance = "report";

  const [finance, setData] = useState({
    income: financeData.income.totalSums,
    expense: financeData.expense.totalSums,
  });

  const totalSum = useMemo(() => {
    const totalIncome =
    finance.income?.reduce((x, y) => x + Number(y.price), 0) 
      // + data.budget || 0;

    const totalExpense = finance.expense?.reduce(
      (x, y) => x + Number(y.price),
      0
    );

    const cond1 = Number.isNaN(totalIncome);
    const cond2 = Number.isNaN(totalExpense);

    if (!cond1 && !cond2) {
      return totalIncome - totalExpense;
    } else return 0;
  }, [data?.report?.expense?.totalSums, data?.report?.income?.totalSums, finance]);

  useEffect(() => {
    async function getingData() {
      const res = await fetch("/api/reportGet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: dateInput,
        }),
      });
      const resData = await res.json();
      setData(resData.data);
    }
    getingData();
  }, [dateInput, route]);

  return (
    <>
      <Head>
        <title>Daily expenses</title>
        <meta
          name="description"
          content="Your personal finance statement app"
        />
      </Head>
      <main className="flex-col min-h-screen my-auto flex-center">
        <div className="flex-col p-10 bg-white rounded-md shadow-2xl flex-center">
          <div className="flex items-center text-sm">
            <div className="mr-1 text-xl">
              <BsBoxArrowInLeft />
            </div>
            <Link href="/account" className="text-lg">
              Назад
            </Link>
          </div>
          <div className="mb-10 text-3xl font-bold sm:text-5xl text-blue">
            Дневен отчет
          </div>
          <DatePickerComp setDateInput={setDateInput} />
          <div className="mt-10 text-2xl text-center">
            Дневна сметка:
            <span className="pl-1 font-semibold">{totalSum.toFixed(2)}</span>
          </div>
          <div className="grid justify-center mt-10 gap-x-28 md:grid-cols-2">
            <FinanceCalc
              text="Приход:"
              totalSums={finance.income}
              date={dateInput}
              type="income"
              typeFinance={typeFinance}
              session={session}
              route="/api/report"
              removeRoute="/api/removeReport"
            />
            <FinanceCalc
              text="Разход:"
              totalSums={finance.expense}
              date={dateInput}
              session={session}
              type="expense"
              typeFinance={typeFinance}
              route="/api/report"
              removeRoute="/api/removeReport"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default FinanceInput;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  let data = {};
  let daily = {
    income: [],
    expenses: [],
  };
  try {
    await connectMongo();

    const user = await User.findOne({ email: session.user.email }).populate(
      "report"
    );
    // const currentDate = getDate();
    // user.report.expense.totalSums.forEach((data) => {});
    // console.log(daily);

    data = user;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
      session: JSON.parse(JSON.stringify(session)),
    }, // will be passed to the page component as props
  };
}
// const data = {
//   income: {
//     text: "Приход:",
//     totalSums: [
//       {
//         price: 100,
//         reason: "No reason",
//       },
//     ],
//   },
//   expense: {
//     text: "Разход:",
//     totalSums: [
//       {
//         price: 20,
//         reason: "No reason",
//       },
//     ],
//   },
// };
