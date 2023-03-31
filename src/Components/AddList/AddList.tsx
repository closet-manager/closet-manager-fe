import React from "react";
import { Header } from "../Header/Header";
import { Navbar } from "../Navbar/Navbar";
import { useState } from "react";
import { json } from "react-router";
import type { FormEvent } from "react";

interface Event {
  target: {
    value: string;
  };
}

export const AddList: React.FC = (): JSX.Element => {
  const [newCustomList, setNewCustomList] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  //apiCall Function  these need to move to apiCall file
  const postCustomList = async (data: any) => {
    // we cannot leave data: any!! We should make an interface
    const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/lists`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data }),
    });
    if (!response.ok) {
      throw new Error("Unable To Post Your Data. Try Later.");
    }
    return response.json();
  };
  const handleInputChange = (event: Event) => {
    setNewCustomList(event.target.value);
  };
  const handleSubmit = async () => {
    console.log(newCustomList);
    try {
      await postCustomList(newCustomList);
    } catch (err) {
      console.log(err);
    }
    clearInput();
  };
  const clearInput = () => {
    setNewCustomList("");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add My New Custom List</h2>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="name" className="custom-list-input">
          My custom list Name
          <input
            type="text"
            name="name"
            value={newCustomList}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </label>
        <button type="submit" value="Submit" className="form-button">
          Add My Custom List
        </button>
      </form>
    </div>
  );
};
