import { useEffect, useState } from 'react';
import { List } from '../List/List'
import './MyLists.css'

interface ListDetails {
  id: number;
  name: string;
  items: string[];
}

interface ListProps {
  listId: number;
  onBack: () => void;
}

export const MyLists: React.FC<{ userId: number }> = ({ userId }) => {
  const [lists, setLists] = useState<ListDetails[]>([]); // change state type to ListDetails[]
  const [selectedList, setSelectedList] = useState<number | null>(null); // track which list is selected
  const [error, setError] = useState<string | null>(null);

  const fetchLists = async () => {
    try {
      const response = await fetch(`https://closet-manager-be.herokuapp.com/api/v1/users/${userId}/lists`);
      const data = await response.json();
      const listDetails = data.data.map((list: any) => ({ id: parseInt(list.id), name: list.attributes.name, items: list.attributes.items }));
      setLists(listDetails);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the lists.');
    }
  };

  useEffect(() => {
    fetchLists();
  }, [userId]);

  const handleListClick = (listId: number) => {
    setSelectedList(listId); // set the selectedList state to the ID of the clicked list
  };

  const handleBackClick = () => {
    setSelectedList(null); // set the selectedList state back to null when the user goes back
  };

  return (
    <div>
      {selectedList ? ( // if a list is selected, show the List component
        <List listId={selectedList} onBack={handleBackClick} />
      ) : (
        <div>
          <h2>Custom Lists</h2>
          {error ? (
            <h2>{error}</h2>
          ) : (
            <div className="button-container">
              {lists.map((list) => (
                <button key={list.id} className="list-button" onClick={() => handleListClick(list.id)}>
                  {list.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
