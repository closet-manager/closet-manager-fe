import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { getSingleItem, deleteItem } from "../../apiCall";

export const Calendar = ({ id }) => {
  const [startDate, setStartDate] = useState(new Date());

const getDate = (date) => {
  console.log(date.toISOString().slice(0, 10))
  console.log(id)

}

  return (
    <DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => {
        setStartDate(date) 
        getDate(date)}}
        popperPlacement="top"
    />
  );
};

