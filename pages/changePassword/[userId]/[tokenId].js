import React, { useState, useEffect } from "react";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
// Models
import Token from "../../../db/models/Token";

import { connectMongo } from "../../../db/connectDb";
// Components

// NextJs
import Head from "next/head";
import { useRouter } from "next/router";
import ColorInput from "../../../components/ColorInput";
import {
  toastError,
  toastSuccess,
} from "../../../components/notifications/Toast";

const innerRoutes = {
  verifyAccount: "verifyAccountToken",
  changePassword: "changePassword",
  verifyDelivery: "verifyDelivery",
};
export default function Index({ data }) {
  const router = useRouter();

  const passData = {
    password: "",
    confPassword: "",
  };
  const [inputs, setInputs] = useState(passData);
  const [errors, setErrors] = useState(null);
  const [isFound, setIsFound] = useState(true);
  const [dataState, setDataState] = useState(data);
  const [isLoading, setLoading] = useState(false);

  function passStateHandler(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }
  async function passFormHandler(e) {
    e.preventDefault();
    let sendDataInputs = inputs;
    sendDataInputs.userId = data.userId;
    sendDataInputs.token = data.token;
    const res = await fetch("/api/account/forgotten/succPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendDataInputs),
    });
    const resData = await res.json();
    if (res.status != 201) {
      setErrors(...resData.errors);
      return;
    }
    setDataState((prevState) => ({
      ...prevState,
      route: "success",
      message: resData.message,
    }));
  }
  const inputsHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async () => {
    const res = await fetch("/api/auth/changePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...inputs,
        token: data.token,
        userId: data.userId,
      }),
    });
    const resData = await res.json();
    if (resData.error) {
      toastError(resData.error);
    }
    if (resData.message) {
      toastSuccess(resData.message);
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Changing password</title>
        <meta name="description" content="Смяна на паролата" />
      </Head>
      <main className="w-screen h-screen flex-center">
        <div className="container flex flex-col items-center justify-center w-full py-10 text-center bg-white rounded shadow-xl lg:max-w-xl">
          {dataState?.message && (
            <>
              <div className="text-2xl text-green">{dataState.message}</div>
              <div className="mt-2 text-lg underline cursor-pointer text-primary">
                <a onClick={() => router.push("/")}>Към начална страница</a>
              </div>
            </>
          )}
          {dataState?.error && (
            <>
              <div className="text-2xl text-secondary">{dataState.error}</div>
              <div className="mt-2 text-lg underline cursor-pointer text-primary">
                <a onClick={() => router.push("/")}>Към начална страница</a>
              </div>
            </>
          )}
          {dataState?.route == innerRoutes.changePassword &&
            !dataState?.error && (
              <div className="container flex flex-col items-center ">
                <h1 className="mb-5 text-lg font-medium text-primary">
                  Смяна на паролата
                </h1>
                {errors && <div className="mb-4 text-secondary">{errors}</div>}
                <form
                  className="w-1/2"
                  onSubmit={passFormHandler}
                  onChange={passStateHandler}
                >
                  <ColorInput
                    labelName="Парола"
                    name="password"
                    type="password"
                    isBtn={false}
                    state={isFound ? "" : "wrong"}
                    isLoading={isLoading}
                    input={inputs.password}
                    setInput={inputsHandler}
                    onClick={submitHandler}
                  />
                  <ColorInput
                    labelName="Потвърди паролата"
                    name="confPassword"
                    type="password"
                    btnName="Изпрати"
                    state={isFound ? "" : "wrong"}
                    isLoading={isLoading}
                    input={inputs.confPassword}
                    setInput={inputsHandler}
                    onClick={submitHandler}
                  />
                </form>
              </div>
            )}
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { tokenId: token, userId } = params;

  await connectMongo();
  let data = {};
  try {
    if (token.length < 12) throw { message: "Невалидна сесия!" };

    const foundToken = await Token.findOne({
      token: ObjectId(token),
    });

    if (!foundToken || foundToken?.userId != userId) {
      throw {
        message: "Невалидна сесия!",
      };
    }

    if (!data.error) {
      data.route = innerRoutes.changePassword;
      data.token = token;
      data.userId = userId;
    }
  } catch (e) {
    data.error = e.message;
  }

  mongoose.connection.close();

  return {
    props: { data },
  };
}
