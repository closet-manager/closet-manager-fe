import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddList.css";
import { postCustomList } from "../../apiCall";
import GridLoader from "react-spinners/GridLoader";

interface Event {
  target: {
    value: string;
  };
}

export const AddList: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [newCustomList, setNewCustomList] = useState<string>("");
  const [listId, setListId] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: Event) => {
    setNewCustomList(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await postCustomList(newCustomList)
        .then((response) => {
          setListId(response.data.id)
          navigate(`/lists`, {
          state: {listId: listId}
      });
        })
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
    setLoading(false)
    setNewCustomList("");
  };

  return (
    <div className="list-form-container">
        <h2 className="form-list-title">Create New List</h2>
      {!loading && <div>
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
              placeholder="List Name"
              name="name"
              value={newCustomList}
              onChange={(e) => handleInputChange(e)}
              required
              className="input"
            />
          </label>
          <button type="submit" value="Submit" className="form-button">
            Create List
          </button>
        </form>
      </div>}
      {loading && (
        <div className="add-item-spinner">
          <GridLoader
            color="#c8b6ff"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>)}
    </div>
  );
};
