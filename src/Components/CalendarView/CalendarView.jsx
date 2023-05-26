import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import "./CalendarView.css"
import { useNavigate } from "react-router-dom";
import { getAllDates } from "../../apiCall";
import GridLoader from "react-spinners/GridLoader";

export const CalendarView = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dates, setDates] = useState(undefined)
  const [error, setError] = useState(undefined);
  const [marker, setMarker] = useState(undefined)
  const [loading, setLoading] = useState(true)

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    getAllDates()
    .then((res) => {
      setDates(res.data.map((date) => date.attributes["outfit_date"]))
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setError(true)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
   if (dates) {
     setMarker(dates.map((day) => {
       let newDate = new Date(day)
       return new Date(newDate.getTime() + Math.abs(newDate.getTimezoneOffset()*60000) )  
     }))
   }
  }, [dates])

  return (
    <section>
      {error && <p>Error</p>}
      {loading && (
        <div className="closet-loader">
          <GridLoader
            color="#c8b6ff"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div className="cal-view">
        {dates && marker && <div className="date-picker">
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                if (date) {
                  const selectedDate = new Date(date).toISOString().slice(0, 10)
                  navigate(`/date/${selectedDate}`)
                }
              }}
              selectsRange
              inline
              highlightDates={marker}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          }

      </div>

    </section>
  );
}