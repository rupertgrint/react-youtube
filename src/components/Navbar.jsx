import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { useSearch } from '../context/SearchContext';

export default function Navbar() {
  const { searchInput, setSearchInput } = useSearch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${encodeURIComponent(searchInput)}`);
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
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <input
          type='text'
          placeholder='Search...'
          onChange={handleChange}
          value={searchInput}
          style={{ marginRight: '8px' }}
        />
        <button
          type='submit'
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          <CiSearch />
        </button>
      </form>
      <Link to='/video/:videoId'>Detail</Link>
    </nav>
  );
}
