import { Card } from "../Card/Card";
import "./Closet.css";
import { useState, useEffect } from "react";
import { filterItems, getAllItems } from "../../apiCall";
import GridLoader from "react-spinners/GridLoader";

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

export const Closet = (): JSX.Element => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    getAllItems()
      .then((response) => {
        setAllItems(response.data);
        setFilteredItems(response.data);
        setFetchError(false);
        setLoading(false);
      })
      .catch((Error) => {
        console.error("All Items Fetch Error");
        setFetchError(true);
        setAllItems([]);
        setFilteredItems([]);
        setLoading(false);
      });
  }, [change]);

  const mappedItems = filteredItems.map((item: Item): JSX.Element => {
    return (
      <Card
        key={item.id}
        id={item.id}
        image={item.attributes.image_url}
        setChange={setChange}
      />
    );
  });

  const handleFilter = async (): Promise<void> => {
    const clothing_type = document.querySelector<HTMLSelectElement>(
      "#filter--clothing-type"
    )!;
    const color = document.querySelector<HTMLSelectElement>("#filter--color")!;
   
    const season =
      document.querySelector<HTMLSelectElement>("#filter--season")!;

    const queries = [
      { name: "season", value: season.value },
      { name: "clothing_type", value: clothing_type.value },
      { name: "color", value: color.value },
    ];
    const truthyQueries = queries.filter(({ value }) => value);
    const queriesString = truthyQueries
      .map(({ name, value }) => `${name}=${value}`)
      .join("&");

    const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/find_all?${queriesString}`;
    setLoading(true);
    filterItems(url)
      .then((response) => {
        setFilteredItems(response.data);
        setFetchError(false);
      })
      .catch((Error) => {
        console.error("Filter Fetch Error");
        setFetchError(true);
        setFilteredItems([]);
      });
    setLoading(false);
  };

  return (
    <div className="closet-container">
      <h2>My Closet</h2>
      <div id="filter" onChange={handleFilter}>
        <select id="filter--clothing-type" name="type">
          <option value="">Clothing Type</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="outerwear">Outerwear</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
          <option value="other">Other</option>
        </select>
        <select id="filter--color" name="color">
          <option value="">Color</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="neutral">Neutral</option>
          <option value="other">Multi</option>
        </select>
        <select id="filter--season" name="season">
          <option value="">Season</option>
          <option value="fall">Fall</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
        </select>
      </div>

      {loading && (
        <div className="closet-loader">
          <GridLoader
            color="#c8b6ff"
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {fetchError && (
        <p className="fetch-error-text">
          Unable to get items. Please try again later"
        </p>
      )}
      {!filteredItems.length && !loading && <p>No Items Found</p>}
      <div className="cards-container">{mappedItems}</div>
    </div>
  );
};
