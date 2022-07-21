/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { signOut } from '../utils/auth';

function User({
  image, name, email, lastLogin,
}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{email}</Card.Text>
        <Card.Text>{lastLogin}</Card.Text>
      </Card.Body>
      <button type="button" className="btn btn-danger" onClick={signOut}>Sign Out</button>
    </Card>
  );
}

User.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  lastLogin: PropTypes.string,
};

User.defaultProps = {
  image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg',
  name: 'Mitch',
  email: 'mitchmcculough@gmail.com',
  lastLogin: '5/4/22 0916 CST',
};

export default User;
