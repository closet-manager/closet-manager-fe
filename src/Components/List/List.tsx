import React, { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import "./List.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { deleteCustomList } from "../../apiCall";

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


export const List: React.FC = () => {
  const [listDetails, setListDetails] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [change, setChange] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation()
  const listId = location.state.listId
  console.log(location.state)

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
  }, [change]);

  const handleBack = (): void => {
    navigate("/lists");
  };

  const handleDelete = async (itemId: string) => {
    try {
      const response = await fetch(
        `https://closet-manager-be.herokuapp.com/api/v1/items/${itemId}/lists/1`,
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

  const handleDeleteList = async (listId: string) => {
   await deleteCustomList(listId)
    navigate("/lists", {
      state: {deleted: true}
    })
  }

  return (
    <div>
      <div className="list-buttons-container">
        <button className="list-back-btn" onClick={handleBack}>
          Back To Lists
        </button>
        <button className="delete-list-button" onClick={() => handleDeleteList(listId)}> Delete this list</button>
      </div>
      {error && <h2>{error}</h2>}
      <div className="card-grid">
        {listDetails &&
          listDetails.map((item: Item, index: number) => (
            <div key={index} className="list-card">
              <Card id={item.id} image={item.attributes.image_url} setChange={setChange} />
              <button className="delete-list" onClick={() => handleDelete(item.id)}>Delete From List</button>
            </div>
          ))}
      </div>
    </div>
  );
};
