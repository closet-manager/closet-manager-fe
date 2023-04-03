import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteItem } from '../../apiCall';
import { MouseEventHandler } from 'react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import './Card.css';

interface CardProps {
  id: string,
  image: string,
  setChange: Dispatch<SetStateAction<boolean>>,
}

export const Card = ({ id, image, setChange }: CardProps): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onLoad = (): void => setLoaded(true)

  const handleDeleteButton = (id: string) => {
   console.log(id)
   setChange(true)
   return deleteItem(id)
    .then(data => {
      console.log(data);
      setChange(false);
    })
    .catch(err => setError(err))
  }

  return (
    <div key={id} className='card-container'>
      <Link to={`/itemDetails/${id}`}>
        <img 
          onLoad={onLoad}
          src={image} 
          alt='Image of clothing item' 
          className='card-image'
         /> 
         {!loaded && <p>Loading ... </p>}
         {error && <p>Could not delete item. Please try again later.</p>}
      </Link>
      <div className='banner-container'>
        <p onClick={() => handleDeleteButton(id)} className='delete-banner'><i className="fa-light fa-trash-can"></i> Delete</p>
      </div>
    </div>
  )
}