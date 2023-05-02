import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      inline
    />
  );
};

