import { useState, useEffect } from 'react';
import React from "react";
import { Card } from '../Card/Card';
import './List.css';

interface attributes {
  season: string;
  clothing_type: string;
  size: string;
  color: string;
  image_url: string;
  notes: string;
}

interface Item {
  id: string;
  type: string;
  attributes: attributes;
}

interface ListProps {
  listId: string;
  onBack: () => void;
}

export const List: React.FC<ListProps> = ({ listId, onBack }) => {
  const [listDetails, setListDetails] = useState<{ id: string, name: string, items: Item[] }>({ id: '', name: '', items: [] });
  const [error, setError] = useState<string | null>(null);
  const [change, setChange] = useState<boolean>(false);
 
  const fetchListDetails = async () => {
    try {
      const response = await fetch(`https://closet-manager-be.herokuapp.com/api/v1/users/1/lists/${listId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch list details');
      }
      const data = await response.json();
      const { id, attributes: { name, items } } = data.data;
      setListDetails({ id, name, items });
    } catch (error) {
      setError('An error occurred while fetching the list details.');
    }
  };

  useEffect(() => {
    fetchListDetails();
  }, [listId, change]);

  const handleBack = (): void => {
    onBack();
  };
  return (
    <div>
      <button onClick={handleBack}>Back</button>
      {error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <h2>{listDetails.name}</h2>
          <div className='card-grid'>
            {listDetails.items.map((item: Item) => (
              <Card key={item.id} id={item.id} image={item.attributes.image_url} setChange={setChange} />
            ))}
          </div>
        </>
      )}
    </div>
  );  
};
