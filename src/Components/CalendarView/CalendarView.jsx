import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import "./CalendarView.css"
import { useNavigate } from "react-router-dom";
import { getAllDates } from "../../apiCall";

export const CalendarView = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dates, setDates] = useState(undefined)
  const [error, setError] = useState(undefined);
  const [marker, setMarker] = useState(undefined)

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    getAllDates()
    .then((res) => {
      setDates(res.data.map((date) => date.attributes["outfit_date"]))
    
      setMarker(dates.map((day) => {
        // console.log(day)
        let newDate = new Date(day)
          return new Date(newDate.getTime() + Math.abs(newDate.getTimezoneOffset()*60000) )  
        }))
    
    })
    .catch((err) => setError(err))
  }, [dates])


  return (
    <div className="calendar-container" >
       {dates && marker && <DatePicker
          selected={startDate}
          onChange={(date) => {
            if (date) {
              console.log(date)
              const selectedDate = new Date(date).toISOString().slice(0, 10)
              navigate(`/date/${selectedDate}`)
            }
          }}
          selectsRange
          inline
          hightlightDates={[]}
          highlightDates={marker}
         
          
        />}
    </div>
  );
}