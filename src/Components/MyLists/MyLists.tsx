import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List } from '../List/List';
import './MyLists.css';

interface ListDetails {
  id: number;
  name: string;
  items: string[];
}

interface ListProps {
  listId: string;
  onBack: () => void;
}

export const MyLists: React.FC<{ userId: number }> = ({ userId }) => {
  const [lists, setLists] = useState<ListDetails[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLists = async () => {
    try {
      const response = await fetch(`https://closet-manager-be.herokuapp.com/api/v1/users/${userId}/lists`);
      const data = await response.json();
      const listDetails = data.data.map((list: any) => ({
        id: parseInt(list.id),
        name: list.attributes.name,
        items: list.attributes.items,
      }));
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
    setSelectedList(listId.toString());
  };

  const handleBackClick = () => {
    setSelectedList(null);
  };

  return (
    <div>
      {selectedList ? (
        <List listId={selectedList}/>
      ) : (
        <div className="list-container">
          <h2>Custom Lists</h2>
          {error ? (
            <h2>{error}</h2>
          ) : (
            <div className="button-container">
              {lists.map((list) => (
                <Link to={`/lists/${list.id}`}>
                  <button
                    key={list.id}
                    className="list-button"
                    // onClick={() => handleListClick(list.id)}
                  >
                    {list.name}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
