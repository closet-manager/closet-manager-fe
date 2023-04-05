import React, { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import "./List.css";

interface Attributes {
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
  attributes: Attributes;
}

interface ListProps {
  listId: string;
  onBack: () => void;
}

export const List: React.FC<ListProps> = ({ listId, onBack }) => {
  const [listDetails, setListDetails] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [change, setChange] = useState<boolean>(false);

  const fetchListDetails = async () => {
    try {
      const response = await fetch(
        `https://closet-manager-be.herokuapp.com/api/v1/users/1/lists/${listId}/items`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch list details");
      }

      const data = await response.json();
      const items = data.data;
      setListDetails(items);
    } catch (error) {
      setError("An error occurred while fetching the list details.");
    }
  };

  useEffect(() => {
    fetchListDetails();
  }, [listId, change]);

  const handleBack = (): void => {
    onBack();
  };

  const handleDelete = async (itemId: string) => {
    try {
      const response = await fetch(
        `https://closet-manager-be.herokuapp.com/api/v1/items/${itemId}/lists/${listId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setChange(!change);
    } catch (error) {
      setError("An error occurred while deleting the item.");
    }
  };

  return (
    <div>
      <button className="list-back-btn" onClick={handleBack}>
        Back
      </button>

      {error && <h2>{error}</h2>}

      <div className="card-grid">
        {listDetails &&
          listDetails.map((item: Item) => (
            <div key={item.id}>
              <Card id={item.id} image={item.attributes.image_url} setChange={setChange} />
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};
