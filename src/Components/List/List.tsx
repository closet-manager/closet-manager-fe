import { useState, useEffect } from 'react';
import React from "react";
import './List.css';

interface ListDetails {
  id: number;
  name: string;
  items: string[];
}

interface ListProps {
  listId: number;
  onBack: () => void;
}

export const List: React.FC<ListProps> = ({ Id, onBack }) => {
  const [listDetails, setListDetails] = useState<ListDetails>({ id: 0, name: '', items: [] });
  const [error, setError] = useState<string | null>(null);

  const fetchListDetails = async () => {
    try {
      const response = await fetch(`https://closet-manager-be.herokuapp.com/api/v1/lists/${Id}`);
      const data = await response.json();
      const list = data.data;
      setListDetails({ id: parseInt(list.id), name: list.attributes.name, items: list.attributes.items });
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the list details.');
    }
  };

  useEffect(() => {
    fetchListDetails();
  }, [Id]);

  return (
    <div>
      <button onClick={onBack}>Back</button>
      {error ? (
        <h2>{error}</h2>
      ) : (
        <div>
          <h2>{listDetails.name}</h2>
          <ul>
            {listDetails.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};