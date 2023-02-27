import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import ColorInput from "../components/ColorInput";

import { toastError, toastSuccess } from "../components/notifications/Toast";
import { signIn, getSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");

  const [isFound, setIsFound] = useState(true);
  const [isLoading, setLoader] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setLoader(true);

    const res = await fetch("/api/auth/forgotenPassword", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
      }),
    });
    const resData = await res.json();
    console.log(resData);
    if (resData.error) {
      toastError(resData.error);
    }
    if (resData.message) {
      toastSuccess(resData.message);
    }
    setLoader(false);
  }

  return (
    <div>
      <Head>
        <title>Forgoten password</title>
        <meta
          name="description"
          content="Your personal finance statement app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container flex-col h-screen flex-center ">
        <div className="p-10 bg-white rounded-md shadow-2xl">
          <div className="mb-10 text-5xl font-bold text-blue">
            Забравена парола
          </div>

          <ColorInput
            labelName="И-мейл"
            name="email"
            type="email"
            btnName="Изпрати"
            state={isFound ? "" : "wrong"}
            isLoading={isLoading}
            input={emailInput}
            setInput={(e) => setEmailInput(e.target.value)}
            onClick={submitHandler}
          />
          <div
            className="mt-10 underline cursor-pointer"
            onClick={() => router.push("/")}
          >
            Вход
          </div>
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;
  const session = await getSession({ req: context.req });
  const isError = session?.user?.email;
  if (session && !isError?.includes("error")) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }
  if (isError) {
    query.error = isError;
  }
  return {
    props: { session, query },
  };
}
