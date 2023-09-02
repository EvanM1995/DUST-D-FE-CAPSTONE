/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import viewAlbumDetails from '../../api/mergedData';

export default function ViewAlbum() {
  const [albumDetails, setAlbumDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewAlbumDetails(firebaseKey).then(setAlbumDetails);
  }, [firebaseKey]);
  console.warn(albumDetails);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={albumDetails.image} alt={albumDetails.title} style={{ width: '350px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {albumDetails.title} by {albumDetails.artist}
        </h5>
        <h5>
          GENRE: {albumDetails.genreObject?.genre_name}
        </h5>
        <Link href={`/album/edit/${firebaseKey}`} passHref>
          <Button variant="dark">EDIT</Button>
        </Link>
      </div>
    </div>
  );
}
