/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getAlbums } from '../api/albumData';
import AlbumCard from '../components/AlbumCard';
import { useAuth } from '../utils/context/authContext';

function Collection() {
  const [records, setRecords] = useState([]);

  const { user } = useAuth();

  const getAllTheRecords = () => {
    getAlbums(user.uid).then(setRecords);
  };

  useEffect(() => {
    getAllTheRecords();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {records.map((record) => (
          <AlbumCard key={record.firebaseKey} albumObj={record} onUpdate={getAllTheRecords} />
        ))}
      </div>
    </div>
  );
}

export default Collection;
