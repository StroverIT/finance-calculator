import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import ColorInput from "../components/ColorInput";

import { toastError } from "../components/notifications/Toast";
import { signIn, getSession } from "next-auth/react";

import { AiFillFacebook } from "react-icons/ai";

export default function Home() {
  const router = useRouter();

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const [isFound, setIsFound] = useState(true);
  const [isLoading, setLoader] = useState(false);
  const [facebookLoading, setFacebookLoadin] = useState(false);

  const facebookHandler = async (e) => {
    setFacebookLoadin(true);

    await signIn("facebook");

    setFacebookLoadin(false);
  };
  async function submitHandler(e) {
    e.preventDefault();
    setLoader(true);

    const status = await signIn("credentials", {
      redirect: false,
      ...loginInputs,
    });
    if (status.error) {
      toastError(status.error);
      setLoader(false);
    }
    router.replace(router.asPath);
  }

  const inputsHandler = (e) => {
    setLoginInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Head>
        <title>Login page</title>
        <meta
          name="description"
          content="Your personal finance statement app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container flex-col h-screen flex-center ">
        <div className="p-10 bg-white rounded-md shadow-2xl">
          <div className="mb-10 text-5xl font-bold text-blue">Вход</div>
          <ColorInput
            labelName="И-мейл"
            name="email"
            btnName="Вход"
            type="email"
            isBtn={false}
            state={isFound ? "" : "wrong"}
            input={loginInputs.email}
            setInput={inputsHandler}
          />
          <ColorInput
            labelName="Парола"
            name="password"
            type="password"
            btnName="Вход"
            state={isFound ? "" : "wrong"}
            isLoading={isLoading}
            input={loginInputs.password}
            setInput={inputsHandler}
            onClick={submitHandler}
          />
          <div className="grid mt-10 sm:grid-cols-2 gap-y-2">
            <div
              className="underline cursor-pointer "
              onClick={() => router.push("/register")}
            >
              Регистрация
            </div>
            <div
              className="underline cursor-pointer "
              onClick={() => router.push("/forgotenPassword")}
            >
              Забравена парола
            </div>
          </div>
          <section className="mt-12 cursor-pointer md:mx-12">
            <div
              className="bg-[#4267b2]  text-white flex px-8 py-2 rounded-md"
              onClick={facebookHandler}
            >
              <div className="text-3xl ">
                <AiFillFacebook />
              </div>
              <div className="flex items-center justify-center pl-2">
                {facebookLoading ? (
                  <div className="loader"></div>
                ) : (
                  "Вход с Facebook"
                )}
              </div>
            </div>
          </section>
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
