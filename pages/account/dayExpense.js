import Link from "next/link";
import React, { useEffect, useState } from "react";
import FinanceCalc from "../../components/FinanceCalc";
import { connectMongo } from "../../db/connectDb";
import User from "../../db/models/User";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { getSession, signOut } from "next-auth/react";
import Head from "next/head";
const FinanceInput = ({ data, session }) => {
  const [totalSum, setTotalSum] = useState(0);

  const financeData = data.dailyFinance;
  const typeFinance = "daily";

  useEffect(() => {
    const totalIncome = financeData.income.totalSums.reduce(
      (x, y) => x + Number(y.price),
      0
    );
    const totalExpense = financeData.expense.totalSums.reduce(
      (x, y) => x + Number(y.price),
      0
    );
    setTotalSum(totalIncome - totalExpense);
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
          <div className="mb-10 text-5xl font-bold text-blue">
            Дневни сметки
          </div>
          <div className="grid justify-center sm:grid-cols-2 gap-x-28 ">
            <FinanceCalc
              text={financeData.income.text}
              totalSums={financeData.income.totalSums}
              type="income"
              session={session}
              typeFinance={typeFinance}
            />
            <FinanceCalc
              text={financeData.expense.text}
              totalSums={financeData.expense.totalSums}
              type="expense"
              session={session}
              typeFinance={typeFinance}
            />
          </div>
          <div className="mt-10 text-2xl text-center">
            Останали пари за деня:{" "}
            <span className="pl-1 font-semibold">{totalSum}</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default FinanceInput;
export async function getServerSideProps(context) {
  const { query } = context;
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
      "dailyFinance"
    );
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
