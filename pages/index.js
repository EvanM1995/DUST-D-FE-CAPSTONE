import { useEffect, useState } from 'react';
import getAlbums from '../api/albumData';
import { useAuth } from '../utils/context/authContext';
import AlbumCard from '../components/AlbumCard';

function Home() {
  const [records, setRecords] = useState([]);

  const { user } = useAuth();

  const getAllTheAlbums = () => {
    getAlbums(user.uid).then(setRecords);
  };

  useEffect(() => {
    getAllTheAlbums();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {records.map((record) => (
        <AlbumCard key={record.firebaseKey} albumObj={record} onUpdate={getAllTheAlbums} />
      ))}
    </div>
  );
}

export default Home;
