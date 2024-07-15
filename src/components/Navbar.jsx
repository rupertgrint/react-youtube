import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>Youtube Logo</Link>
      <Link to='/search/:keyword'>Search Bar</Link>
      <Link to='/video/:videoId'>Detail</Link>
    </nav>
  );
}
