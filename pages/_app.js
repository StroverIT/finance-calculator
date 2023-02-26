import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
      <div className="absolute  top-0 left-0 -z-10 h-screen w-screen ">
        <div className="absolute bg-index h-screen w-[100vw] top-0 left-0 z-10"></div>

        <div className="h-screen w-screen relative bg-index">
          <Image
            src="/background3.jpg"
            alt="background image"
            fill
            className="object-"
          />
        </div>
      </div>
    </>
  );
}

export default MyApp;
