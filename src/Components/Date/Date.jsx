import { useNavigate, useParams } from "react-router-dom";
import { getItemsForDate } from "../../apiCall";
import { useEffect, useState} from "react";
import { Card } from "../Card/Card";
import "./Date.css"
import GridLoader from "react-spinners/GridLoader";

export const Date = () => {
  const { date } = useParams()
  const [error, setError] = useState(false)
  const [items, setItems] = useState(undefined)
  const [loading, setLoading] = useState(true)
  

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
    const [year, month, day] = dateString.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[Number(month) - 1];
    const daySuffix = getDaySuffix(Number(day));
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

  return (
    <>
    {loading && (
        <div className="closet-loader">
          <GridLoader
            color="#c8b6ff"
            size={40}
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
              <Card id={item.id} image={item.attributes.image_url} />
            </div>
          ))}
    </div>
    {!items && !loading && <p className="no-items-on-date">No items found</p>}
    </>
  )
}