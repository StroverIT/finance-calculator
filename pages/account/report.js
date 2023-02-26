import Link from "next/link";
import React, { useEffect, useState } from "react";
import FinanceCalc from "../../components/FinanceCalc";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { getSession } from "next-auth/react";
import Head from "next/head";

import DatePickerComp from "../../components/DatePickerComp";
import User from "../../db/models/User";
import { connectMongo } from "../../db/connectDb";
import getDate from "../../lib/getDate";
import { useRouter } from "next/router";

const FinanceInput = () => {
  const route = useRouter();
  const [totalSum, setTotalSum] = useState(0);
  const [dateInput, setDateInput] = useState(getDate());

  const [data, setData] = useState([]);

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

  useEffect(() => {
    const totalExpense = data.reduce((x, y) => x + Number(y.price), 0);
    setTotalSum(totalExpense);
  }, [data]);

  return (
    <>
      <Head>
        <title>Daily expenses</title>
        <meta
          name="description"
          content="Your personal finance statement app"
        />
      </Head>
      <main className="flex-col h-screen my-auto flex-center">
        <div className="flex-col p-10 bg-white rounded-md shadow-2xl flex-center">
          <div className="flex items-center text-sm">
            <div className="mr-1 text-xl">
              <BsBoxArrowInLeft />
            </div>
            <Link href="/account" className="text-lg">
              Назад
            </Link>
          </div>
          <div className="mb-10 text-5xl font-bold text-blue">Дневен отчет</div>
          <DatePickerComp setDateInput={setDateInput} />

          <div className="grid justify-center mt-10 gap-x-28">
            <FinanceCalc
              text="Разход:"
              totalSums={data}
              date={dateInput}
              type="expense"
              typeFinance="expense"
              route="/api/report"
              removeRoute="/api/removeReport"
            />
          </div>
          <div className="mt-10 text-2xl text-center">
            Похарчени пари за деня:{" "}
            <span className="pl-1 font-semibold">{totalSum}</span>
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

  try {
    await connectMongo();

    const user = await User.findOne({ email: session.user.email }).populate(
      "report"
    );

    data = user;
  } catch (e) {
    console.log(e);
  }

  return {
    props: { data: JSON.parse(JSON.stringify(data)) }, // will be passed to the page component as props
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
