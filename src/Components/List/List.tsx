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

export const List: React.FC<ListProps> = ({ listId, onBack }) => {
  const [listDetails, setListDetails] = useState<ListDetails>({ id: 0, name: '', items: [] });
  const [error, setError] = useState<string | null>(null);

  const fetchListDetails = async () => {
    try {
      const response = await fetch(`https://closet-manager-be.herokuapp.com/api/v1/lists/${listId}`);
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
  }, [listId]);

};