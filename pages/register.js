import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import ColorInput from "../components/ColorInput";

import { toastError } from "../components/notifications/Toast";
import { signIn, getSession } from "next-auth/react";

import { AiFillFacebook } from "react-icons/ai";

export default function Home() {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    // name: "",
    email: "",
    password: "",
  });

  const [isFound, setIsFound] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (errorMessages.length > 0) return;
    //POST form values
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    //Await for data for any desirable next steps
    if (res.status != 201) {
      const data = await res.json();
      setErrorMessages([...data.map((e) => e)]);
      setLoading(false);
      return;
    }
    const status = await signIn("credentials", {
      redirect: false,
      ...inputs,
    });

    if (status.error) {
      setErrMess(status.error);
      setLoader(false);
    }
    router.replace(router.asPath);
  };

  const inputsHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Head>
        <title>Register page</title>
        <meta
          name="description"
          content="Your personal finance statement app"
        />
      </Head>

      <main className="container flex-col h-screen flex-center">
        <div className="bg-white p-10 rounded-md shadow-2xl">
          <div className="mb-10 text-5xl font-bold text-blue">Регистрация</div>
          {/* <ColorInput
            labelName="Име"
            name="name"
            type="text"
            isBtn={false}
            state={isFound ? "" : "wrong"}
            input={loginInputs.name}
            setInput={inputsHandler}
          /> */}
          <ColorInput
            labelName="И-мейл"
            name="email"
            btnName="Вход"
            type="email"
            isBtn={false}
            state={isFound ? "" : "wrong"}
            input={inputs.email}
            setInput={inputsHandler}
          />
          <ColorInput
            labelName="Парола"
            name="password"
            type="password"
            btnName="Регистрация"
            state={isFound ? "" : "wrong"}
            input={inputs.password}
            setInput={inputsHandler}
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
    </>
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
