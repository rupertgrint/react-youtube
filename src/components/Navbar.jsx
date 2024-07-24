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
    <nav className='flex flex-row justify-center my-[50px] gap-2'>
      <Link to='/'>
        <img className='h-8' src='/yt_logo_rgb_dark.png' alt='Youtube Logo' />
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          className='w-[450px] h-8 p-2 rounded-sm text-black'
          type='text'
          placeholder='Search...'
          onChange={handleChange}
          value={searchInput}
        />
      </form>
      <button type='submit'>
        <CiSearch className='w-6 h-6 border-none cursor-pointer hover:scale-[110%] transition' />
      </button>
    </nav>
  );
}