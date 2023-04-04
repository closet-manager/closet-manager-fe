import { useEffect, useState } from 'react';
import './MyLists.css'

interface ListItem {
  id: number;
  name: string;
}

export const MyLists: React.FC<{ userId: number }> = ({ userId }) => {
  const [lists, setLists] = useState<ListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchLists = async () => {
    try {
      const response = await fetch(`https://closet-manager-be.herokuapp.com/api/v1/users/${userId}/lists`);
      const data = await response.json();
      setLists(data.data.map((list:any) => ({ id: parseInt(list.id), name: list.attributes.name })));
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the lists.');
    }
  };

  useEffect(() => {
    fetchLists();
  }, [userId]);

  const handleListClick = (listId: number) => {
    console.log(`List with ID ${listId} clicked`);
  };

  return (
    <div className="list-container">
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
  );
};
