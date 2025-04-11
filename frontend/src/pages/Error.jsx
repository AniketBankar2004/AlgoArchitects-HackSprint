import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import React from 'react';
import '../styling/error.css';

const Error = () => {
  return (
    <div className="main">
      <img src="/img_404.png" alt="404" />
      <p className="text1">Page Not Found</p>
      <p className="text2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <NavLink to="/Home" className="home">
        <FontAwesomeIcon icon={faHouse} />
        Back to Home
      </NavLink>
    </div>
  );
};

export default Error;
