import React, { useState, useEffect, useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import './AddItem.css';
import { createItem } from '../../apiCall';


export const AddItem: React.FC = (): JSX.Element => {

  const navigate = useNavigate();
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [itemId, setItemId] = useState<number | undefined>();
  const [successfulPost, setSuccessfulPost] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
    if (successfulPost) {
      navigate(`/itemDetails/${itemId}`)
    }
    if (error) {
      navigate('/item-not-found')
    }
  }, [successfulPost, error]);

  const handleSubmit = ({target}: FormEvent<HTMLFormElement> ) => {
    const formData = new FormData(target as HTMLFormElement)
    createItem(formData)
      .then(data => {
        setItemId(data.data.id)
        console.log(data)
        setSuccessfulPost(true)
        setImage("")
        if (imageInputRef.current) {
          imageInputRef.current.value = ""
        }
        })
      .catch(err => setError(err))
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void =>{
    if (target.files) {
      setImage(URL.createObjectURL(target.files[0]));
    }
  }
  
  return (
    <div className="form-container">
      <div className='text-container'> 
        <h2 className="form-title">Add New Item</h2>
      </div>
      <form className="form" id="form" onSubmit={(e => {e.preventDefault(); handleSubmit(e);})}>
        {image && <img src={image} alt="" className='image-preview'/>}
        <label htmlFor="image" className="upload-container">
          Upload or take a photo
          <input 
            className='img-input'
            accept="image/*,capture=camera"
            type="file"
            name="image"
            required
            onChange={handleChange}
            ref={imageInputRef}
          />
        </label>
        <select  className="dropdown" name="clothing_type" required>
          <option value="other" hidden>Clothing Type</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="outerwear">Outerwear</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
          <option value="other">Other</option>
        </select>
        <select className="dropdown" name="color">
          <option value="unspecified">Color</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="neutral">Neutral</option>
          <option value="multi">Multi</option>
        </select>
        <select className="dropdown" name="season">
          <option value="all_season" hidden>Season</option>
          <option value="all_season">All Seasons</option>
          <option value="fall">Fall</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
        </select>
        <label htmlFor="size" className="size-input">
          Size:
          <input type="text" name="size" className="size-input" />
        </label>
        <label htmlFor="notes" className="notes-input">
          Notes:
          <input className="notes-box" 
            type="text" name="notes" />
        </label>
        <input type="reset" value="Clear" className="form-button-clear"></input>
        <button type="submit" value="Submit" className="form-button">Add Item!</button>
      </form>
    </div>
  );
}