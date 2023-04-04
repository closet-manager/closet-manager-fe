import "./Details.css";
import { useEffect, useState} from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getSingleItem, deleteItem } from "../../apiCall";
import { singleItemCleaning } from "../../util";

interface attributes {
  season: string;
  clothing_type: string;
  size: string;
  color: string | undefined;
  image_url: string;
  notes: string;
}

interface Item {
  id: number;
  type: string;
  attributes: attributes;
}

type IdParams = {
  id: string;
}

export const Details = (): JSX.Element => {
  const { id } = useParams<IdParams>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | undefined>();
  const [fetchError, setFetchError] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [isDeleted, setIsDeleted] = useState<boolean>(false); 

  useEffect(() => {
   getSingleItem(id!)
   .then((response) => {
        setItem(singleItemCleaning(response.data))
        setFetchError(false)
        setLoading(false)
      })
      .catch(()  => {
        setFetchError(true)
      })
  }, []);

   useEffect(() => {
    if (fetchError) {
      navigate('/item-not-found')
    }
    if (isDeleted) {
      setItem(undefined)
      setTimeout(() => {
        navigate('/myCloset')
      }, 3500)
    }
  }, [fetchError, isDeleted]);

  const handleDelete = (id: string) =>  {
    deleteItem(id)
     .then(() => {
        setIsDeleted(true)
      })
    .catch(()  => {
        setFetchError(true)
    })
  }

  return (
    <section className="details-section">
      <h2 className="item-details-header">Item Details</h2>
      {loading && <p>Loading...</p>}
      {isDeleted && <p>This item has been removed from your closet.</p>}
      {isDeleted && <p>Redirecting ...</p>}
      {item && <div className="item-details-container">
        {item!.attributes.color && <NavLink to={`/edit/${id}`} className="details-navlink">
          <p className="item-details">{item!.attributes.color}</p>
        </NavLink>}
        <NavLink to={`/edit/${id}`} className="details-navlink">
          <p className="item-details">{item!.attributes.season}</p>
        </NavLink>
        {item!.attributes.clothing_type && <NavLink to={`/edit/${id}`} className="details-navlink">
          <p className="item-details">{item!.attributes.clothing_type}</p>
        </NavLink>}
        {item!.attributes.size && <NavLink to={`/edit/${id}`} className="details-navlink">
          <p className="item-details">{`size ${item!.attributes.size}`}</p>
        </NavLink>}
      </div>}
      {item && <img className="details-image" src={item.attributes.image_url} alt='Image of clothing item'/> }
      {item && item!.attributes.notes && <div className="notes-container"> 
        <h2 className="item-notes-header">Notes</h2>
        <p className="item-notes">{item!.attributes.notes}</p> 
        </div>}
      {!loading && !isDeleted && <div className="details-button-container">
        <NavLink to={`/edit/${id}`} className="details-navlink">
            <button className="details-edit-button">Edit</button>
        </NavLink>
        <button className="details-list-button">Add to List</button>
        <button className="details-delete-button" onClick={() => handleDelete(id!)}>Delete</button>
      </div>}
    </section>
  )
}