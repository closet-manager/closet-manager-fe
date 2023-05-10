import { useNavigate, useParams } from "react-router-dom";
import { getItemsForDate, deleteFromCal } from "../../apiCall";
import { useEffect, useState} from "react";
import { Card } from "../Card/Card";
import "./Date.css"
import GridLoader from "react-spinners/GridLoader";

export const Date = () => {
  const { date } = useParams()
  const [error, setError] = useState(false)
  const [items, setItems] = useState(undefined)
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(true)
  const onLoad = () => setLoaded(true);
  

  useEffect(() => {
    if (date) {
      getItemsForDate(date)
      .then((res) => {
        setLoading(false)
        setItems(res.data)
        })
      }
  }, [])

  const formatDate = (dateString) => {
    let [year, month, day] = dateString.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[Number(month) - 1];
    const daySuffix = getDaySuffix(Number(day));
    if (day.toString().split("")[0] === "0") {
     day = day.toString().split("").splice(1, 1)
    }
    return `${monthName} ${day}${daySuffix}, ${year}`;
  }

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
}

  const handleDelete = (id) => {
    deleteFromCal(id, date)
    .then(() => {
      getItemsForDate(date)
      .then((res) => {
        setLoading(false)
        setItems(res.data)
        })
    })
    .catch(() => setError(true))
  }

  return (
    <>
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
    <h2 className="calendar-date">{formatDate(date)}</h2>
    <div className="card-grid">
        {items &&
          items.map((item, index) => (
            <div key={index} className="list-card">
              
              <img className="card-image" src={item.attributes.image_url} onLoad={onLoad}/>
              <div className="banner-container">
                <p onClick={() => handleDelete(items[index].id)} className="delete-banner">
                  <i className="fa-light fa-trash-can"></i> Delete
                </p>
              </div>
           </div>
          ))}
    </div>
    {!items && !loading && <p className="no-items-on-date">No Items Added</p>}
    </>
  )
}