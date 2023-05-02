import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "./CalendarView.css"
import { useNavigate, useParams } from "react-router-dom";

export const CalendarView = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="calendar-container" >
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            if (date) {
              const selectedDate = new Date(date).toISOString().slice(0, 10)
              console.log(selectedDate);
              navigate(`/date/${selectedDate}`)
            }
          }}
          selectsRange
          inline
        />
    </div>
  );
}