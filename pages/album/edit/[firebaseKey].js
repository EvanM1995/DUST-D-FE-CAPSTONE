import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleAlbum } from '../../../api/albumData';
import AlbumForm from '../../../components/AlbumForm';

export default function EditAlbum() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAlbum(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<AlbumForm obj={editItem} />);
}
