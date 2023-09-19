/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getAlbums } from '../api/albumData';
import AlbumCard from '../components/AlbumCard';
import { useAuth } from '../utils/context/authContext';
import SearchBar from '../components/SearchBar';

function Collection() {
  const [records, setRecords] = useState([]);

  const { user } = useAuth();

  const getAllTheRecords = () => {
    getAlbums(user.uid).then(setRecords);
  };

  useEffect(() => {
    getAllTheRecords();
  }, []);

  const filterResult = (query) => {
    if (!query) {
      getAllTheRecords();
    } else {
      const filter = records.filter((record) => record.title.toLowerCase().includes(query));
      setRecords(filter);
    }
  };

    <div>
      <SearchBar onKeyUp={(query) => filterResult(query)} />
    </div>;

    return (
      <div id="records" className="text-center my-4">
        <div> <SearchBar onKeyUp={(query) => filterResult(query)} />
          <div className="d-flex flex-wrap">
            {records.map((record) => (
              <AlbumCard key={record.firebaseKey} albumObj={record} onUpdate={getAllTheRecords} />
            ))}
          </div>
        </div>
      </div>
    );
}

export default Collection;
