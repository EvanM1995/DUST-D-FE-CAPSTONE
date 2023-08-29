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
    <Card style={{ width: '15rem', margin: '10px' }}>
      <Card.Img variant="top" src={albumObj.image} alt={albumObj.title} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>{albumObj.title}</Card.Title>
        <p>{albumObj.artist}</p>
        <h6>{albumObj.genre}</h6>
        <Button variant="caution" onClick={deleteThisAlbum} className="m-2">
          REMOVE
        </Button>
        <Link href={`/album/edit/${albumObj.firebaseKey}`} passHref>
          <Button variant="caution">EDIT ALBUM</Button>
        </Link>
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
