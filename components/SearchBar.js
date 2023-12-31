import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default function SearchBar({ onKeyUp }) {
  const handleChange = (e) => {
    onKeyUp(e.target.value.toLowerCase());
  };

  return (
    <>
      <Form className="search">
        <div className="search-box">
          <input
            className="search-input"
            id="search"
            name="search"
            placeholder="Search Collection"
            onChange={handleChange}
            type="text"
          />
        </div>
      </Form>
    </>
  );
}

SearchBar.propTypes = {
  onKeyUp: PropTypes.func.isRequired,
};
