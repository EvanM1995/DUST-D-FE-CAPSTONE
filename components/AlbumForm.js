import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createAlbum, updateAlbum } from '../api/albumData';
import { getGenres } from '../api/genreData';

const initialState = {
  title: '',
  image: '',
  genre: '',
  artist: '',
};

function AlbumForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (obj?.firebaseKey) setFormInput(obj);
    getGenres().then(setGenres);
  }, [obj, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAlbum(formInput).then(() => router.push(`/album/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAlbum(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAlbum(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj?.firebaseKey ? 'UPDATE' : 'ADD'} ALBUM</h2>

      <FloatingLabel controlId="floatingInput1" label="Album Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Album Name"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Album Cover" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter Album Cover"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Genre">
        <Form.Select
          aria-label="Genre"
          name="genre"
          onChange={handleChange}
          className="mb-3"
          value={formInput.genre}
          required
        >
          <option value="">Select Genre</option>
          {
            genres.map((genre) => (
              <option
                key={genre.firebaseKey}
                value={genre.firebaseKey}
              >
                {genre.genre_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Artist" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Artist"
          name="artist"
          value={formInput.artist}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit" variant="dark">{obj?.firebaseKey ? 'Update' : 'Create'} Album Entry</Button>

    </Form>
  );
}

AlbumForm.propTypes = {
  obj: PropTypes.shape({
    genre: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    artist: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

AlbumForm.defaultProps = {
  obj: initialState,
};

export default AlbumForm;
