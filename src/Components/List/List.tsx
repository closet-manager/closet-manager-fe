import { useState, useEffect } from 'react';
import React from "react";
import { Card } from '../Card/Card';
import './List.css';

interface ListDetails {
  id: string;
  name: string;
  items: Item[];
}

interface Item {
  id: string;
  type: string;
  attributes: {
    season: string;
    clothing_type: string;
    size: string;
    color: string;
    image_url: string;
    notes: string;
  }
}

interface ListProps {
  listId: string;
  onBack: () => void;
}

export const List: React.FC<ListProps> = ({ listId, onBack }) => {
  const [listDetails, setListDetails] = useState<ListDetails>({ id: '', name: '', items: [] });
  const [error, setError] = useState<string | null>(null);
  const [change, setChange] = useState<boolean>(false);

  const fetchListDetails = async () => {
    try {
      const response = await fetch(`https://closet-manager-be.herokuapp.com/api/v1/users/1/lists/${listId}`);
      const data = await response.json();
      const list = data.data;
      setListDetails({ id: list.id, name: list.attributes.name, items: list.attributes.items });
    } catch (error) {
      console.error(error);
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
        <div>
          <h2>{listDetails.name}</h2>
          <div className='card-grid'>
            {listDetails.items.map((item: Item) => (
              <Card key={item.id} image={item.attributes.image_url} setChange={setChange} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
