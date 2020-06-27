import React from 'react';
import { Link } from 'react-router-dom';
 
 
const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to='/signin'>Sign In</Link>
      </li>
      <li>
        <Link to='/'>Landing</Link>
      </li>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/profil'>Account</Link>
      </li>
      <li>
        <Link to='/admin'>Admin</Link>
      </li>
    </ul>
  </div>
);
 
export default Navigation;