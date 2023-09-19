import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteAlbum } from '../api/albumData';

function AlbumCard({ albumObj, onUpdate }) {
  const deleteThisAlbum = () => {
    if (window.confirm(`Remove ${albumObj.title} from collection?`)) {
      deleteAlbum(albumObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '15rem', margin: '35px' }}>
      <Card.Img variant="top" src={albumObj.image} alt={albumObj.title} style={{ height: '230px' }} />
      <Card.Body>
        <Link href={`/album/${albumObj.firebaseKey}`} passHref>
          <Button variant="caution" className="m-2">{albumObj.title}</Button>
        </Link>
        <Button variant="dark" onClick={deleteThisAlbum} className="m-2">
          REMOVE
        </Button>
      </Card.Body>
    </Card>
  );
}

AlbumCard.propTypes = {
  albumObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    artist: PropTypes.string,
    genre: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AlbumCard;
