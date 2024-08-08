import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';

export default function Header() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      navigate(`/search/${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <header className='flex flex-row justify-center content-center my-[50px] gap-2'>
      <Link to='/'>
        <img
          className='h-8 w-full sm:w-full'
          src='/images/yt_logo_rgb_dark.png'
          alt='Youtube Logo'
        />
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          className='w-[25vw] h-8 p-2 md:w-[30vw] lg:w-[40vw] rounded-sm text-black transition-transform'
          type='text'
          placeholder='Search...'
          onChange={handleChange}
          value={searchInput}
        />
      </form>
      <button type='submit'>
        <CiSearch className='w-6 h-6 border-none cursor-pointer hover:scale-[110%] transition-transform' />
      </button>
    </header>
  );
}
