import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function AlbumCard({ albumObj }) {
  return (
    <Card style={{ width: '20rem', margin: '10px' }}>
      <Card.Img variant="top" src={albumObj.image} alt={albumObj.title} style={{ height: '340px' }} />
      <Card.Body>
        <Card.Title>{albumObj.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

AlbumCard.propTypes = {
  albumObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
