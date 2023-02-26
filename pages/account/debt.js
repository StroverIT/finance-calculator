import Link from "next/link";
import React, { useEffect, useState } from "react";

import { connectMongo } from "../../db/connectDb";
import User from "../../db/models/User";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { getSession } from "next-auth/react";
import DeptCalc from "../../components/DeptCalc";

const FinanceInput = ({ data, session }) => {
  const [totalSum, setTotalSum] = useState(0);

  const financeData = data.dept.totalSums;
  useEffect(() => {
    const totalIncome = financeData.reduce((x, y) => x + Number(y.price), 0);
    setTotalSum(totalIncome);
  }, [data]);
  return (
    <>
      <main className="container flex-col h-screen my-auto flex-center">
        <div className="bg-white p-10 rounded-md shadow-2xl flex-center flex-col ">
          <div className="flex items-center mb-10 text-sm">
            <div className="mr-1 text-lg">
              <BsBoxArrowInLeft />
            </div>
            <Link href="/account">Назад</Link>
          </div>
          <div className="mb-10 text-5xl font-bold text-blue">Дължими суми</div>
          <div className="flex justify-center gap-x-28 ">
            <DeptCalc totalSums={financeData} session={session} />
          </div>
          <div className="mt-10 text-2xl text-center text-red-700">
            Общо дължима сума:{" "}
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
      "dept"
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
