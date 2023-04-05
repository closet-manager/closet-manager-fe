import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MyLists.css';

interface ListDetails {
  id: number;
  name: string;
  items: string[];
}


export const MyLists: React.FC = () => {
  const [lists, setLists] = useState<ListDetails[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  

  const fetchLists = async () => {
    try {
      const response = await fetch(`https://closet-manager-be.herokuapp.com/api/v1/users/1/lists`);
      const data = await response.json();
      const listDetails = data.data.map((list: any) => ({
        id: parseInt(list.id),
        name: list.attributes.name,
        items: list.attributes.items,
      }));
      setLists([...listDetails]);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the lists.');
    }
  };

  useEffect(() => {
    fetchLists();
  }, [location?.state?.deleted]);

  const handleListClick = (listId: number) => {
    setSelectedList(listId.toString());
  };

  const handleBackClick = () => {
    setSelectedList(null);
  };

  return (
    <div>
      <div className="button-container">
        {lists.map((list) => (
          <Link to={`/lists/${list.id}`} key={list.id} state={{listId: list.id}} style={{ textDecoration: 'none' }}>
            <button className="list-button">
              {list.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};
