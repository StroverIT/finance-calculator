import { useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import getDate from "../lib/getDate";

const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactNode | JSX.Element
    prev: () => <span>Минал</span>,
    next: () => <span>Следващ</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "bg",
};

const DatePickerComp = ({ setDateInput }) => {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    const date = getDate(selectedDate);

    setDateInput(date);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div>
      <DatePicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};
export default DatePickerComp;
