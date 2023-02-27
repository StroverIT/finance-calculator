import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsCalendarDay, BsCalendarMonth } from "react-icons/bs";
import { FcDebt } from "react-icons/fc";
import LogoutBtn from "../../components/LogoutBtn";
const FinanceInput = ({ data, session }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Your personal finance</title>
      </Head>
      <main className="h-screen my-auto flex-center">
        <div className="flex-col py-10 bg-white max-sm:w-full md:px-20 flex-center ">
          <LogoutBtn className="mb-2 " />
          <div className="mb-5 text-4xl font-bold md:text-6xl text-blue">
            Финансов отчет
          </div>
          <div className="grid grid-cols-1 mt-10 text-2xl md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-5">
            <button
              className="flex items-center justify-center w-full py-4 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:w-auto px-7 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => router.push("/account/monthExpense")}
            >
              <div className="relative w-10 h-10 mr-2 sm:h-14 sm:w-14">
                <Image src="/icons/month.png" alt="month" fill />
              </div>
              Месечни сметки
            </button>
            <button
              className="flex items-center justify-center w-full px-5 py-4 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => router.push("/account/dayExpense")}
            >
              <div className="relative w-8 h-8 mr-2 sm:h-14 sm:w-14">
                <Image src="/icons/day-and-night.png" alt="month" fill />
              </div>
              Дневни сметки
            </button>
            <button
              className="flex items-center justify-center w-full px-5 py-4 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => router.push("/account/debt")}
            >
              <span className="pr-1 text-3xl sm:text-4xl">
                <FcDebt />
              </span>
              Дължими суми
            </button>
            <button
              className="flex items-center justify-center w-full px-5 py-4 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => router.push("/account/report")}
            >
              <div className="relative w-8 h-8 mr-2 sm:h-14 sm:w-14">
                <Image src="/icons/business-report.png" alt="month" fill />
              </div>
              Дневен отчет
            </button>
            {/* <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => router.push("/")}
            >
              Важни дати
            </button> */}
            {/* <button
              onClick={() => router.push("/")}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Планове
            </button> */}
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

  return {
    props: {}, // will be passed to the page component as props
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
