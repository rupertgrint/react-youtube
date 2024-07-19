import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

export default function Navbar() {
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  return (
    <nav>
      <Link to='/'>
        <img
          src='/yt_logo_rgb_light.png'
          alt='Youtube Logo'
          style={{ height: '40px' }}
        />
      </Link>
      <input
        type='text'
        placeholder='Search...'
        onChange={handleChange}
        value={searchInput}
      />
      <Link to='/search/:keyword'>
        <CiSearch />
      </Link>
      <Link to='/video/:videoId'>Detail</Link>
    </nav>
  );
}
