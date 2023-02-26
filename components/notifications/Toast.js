import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const options = {
  autoClose: 4000,
  className: "text-sm text-dark",
  position: toast.POSITION.TOP_RIGHT,
};
const promiseOptions = {
  autoClose: -1,
  className: "",
  position: toast.POSITION.TOP_CENTER,
};
const optionsTest = {
  position: "top-right",
  autoClose: -1,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "text-dark",
};

// export const toastProduct = (productName) => {
//   toast(<ProductNotif productName={productName} />, optionsTest);
// };
export const toastProduct = (productName) => {
  toast.success(`${productName}`, options);
};

export const toastPromise = (message) => {
  toast.loading(message, promiseOptions);
};
export const toastHideAll = () => {
  toast.dismiss();
};
export const toastSuccess = (message) => {
  toast.success(message, options);
};

export const toastError = (message) => {
  toast.error(message, options);
};

export const toastWarning = (message) => {
  toast.warn(message, options);
};

export const toastInformation = (message) => {
  toast.info(message, options);
};

export const toastDark = (message) => {
  toast.dark(message, options);
};

export const toastDefault = (message) => {
  toast(message, options);
};
