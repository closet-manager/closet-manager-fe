import React from "react";
import { useState } from "react";
import "./AddList.css";

interface Event {
  target: {
    value: string;
  };
}

export const AddList: React.FC = (): JSX.Element => {
  const [newCustomList, setNewCustomList] = useState<string>("");
  const [hasError, setHasError] = useState<string | null>(null);
  const [isPost, setIsPost] = useState<string | null>(null);

  //apiCall Function  these need to move to apiCall file
  const postCustomList = async (data: string) => {
    const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/lists`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data }),
    });
    if (!response.ok) {
      throw new Error("Unable To Post Your Data. Try Later.");
    }
    setIsPost("YOUR CUSTOM LIST IS CREATED");
    return response.json();
  };

  const handleInputChange = (event: Event) => {
    setNewCustomList(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(newCustomList);
    try {
      // next line is for throw error to see if the error message work
      // throw new Error("WHERE AM I??");
      await postCustomList(newCustomList);
    } catch (error) {
      console.error(error);
      setHasError("UNABLE TO CREATE NEW CUSTOM LIST");
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
    <div className="form-container">
      <h2 className="form-title">Create New List</h2>
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
            placeholder="Add Custom List Name"
            name="name"
            value={newCustomList}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </label>
        <button type="submit" value="Submit" className="form-button">
          Add My Custom List
        </button>
        {hasError && <h2 className="alert-msg">{hasError}</h2>}
        {isPost && <h2 className="alert-msg">{isPost}</h2>}
      </form>
    </div>
  );
};
