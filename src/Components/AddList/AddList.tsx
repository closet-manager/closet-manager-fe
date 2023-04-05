import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddList.css";
import { postCustomList } from "../../apiCall";

interface Event {
  target: {
    value: string;
  };
}

export const AddList: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [newCustomList, setNewCustomList] = useState<string>("");
  const [hasError, setHasError] = useState<string | null>(null);
  const [isPost, setIsPost] = useState<string | null>(null);
  const [listId, setListId] = useState<string | undefined>();

  useEffect(() => {
    if (isPost) {
      navigate(`/lists/${listId}`);
    }
    if (hasError) {
      navigate("/error");
    }
  }, [isPost, hasError]);

  const handleInputChange = (event: Event) => {
    setNewCustomList(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(newCustomList);
    try {
      await postCustomList(newCustomList)
        .then((response) => setListId(response.data.id))
        .then(() => setIsPost("New List Created"));
    } catch (error) {
      console.error(error);
      setHasError("Error: Unable to Create New List");
    }
    clearInput();
  };

  const clearInput = () => {
    setNewCustomList("");
    setTimeout(() => {
      setIsPost(null), setHasError(null);
    }, 3000);
  };

  return (
    <div className="list-form-container">
      <h2 className="form-list-title">Create New List</h2>
      <form
        className="form--list"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="name" className="list--input">
          <input
            type="text"
            placeholder="Type List Name Here"
            name="name"
            value={newCustomList}
            onChange={(e) => handleInputChange(e)}
            required
            className="input"
          />
        </label>
        <button type="submit" value="Submit" className="form-button">
          Add My Custom List
        </button>
      </form>
    </div>
  );
};
