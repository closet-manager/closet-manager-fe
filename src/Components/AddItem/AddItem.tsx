import React, { useState } from 'react'
import './AddItem.css';
import { createItem } from '../../apiCall';
import type { FormEvent } from 'react';
import type { ChangeEvent } from "react"

export const AddItem: React.FC = (): JSX.Element => {

  const [image, setImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successfulPost, setSuccessfulPost] = useState<boolean>(false);

  const handleSubmit = ({target}: FormEvent<HTMLFormElement> ) => {
    const formData = new FormData(target as HTMLFormElement)
    createItem(formData)
      .then(data => {
        console.log(data)
        setSuccessfulPost(true);
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
        {error && <p>Sorry, please try again.</p>}
        {successfulPost && <p>Item Added!</p>}
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
          <option value="unspecified" hidden>Color</option>
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
        <button type="submit" value="Submit" className="form-button">Add Item!</button>
      </form>
    </div>
  );
}