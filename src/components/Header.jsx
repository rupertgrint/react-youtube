import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';

export default function Header() {
  const { keyword } = useParams();
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

  useEffect(() => {
    setSearchInput(keyword || '');
  }, [keyword]);

  return (
    <header className='flex flex-row justify-center py-12 gap-2'>
      <Link to='/'>
        <img
          className='h-8 w-full'
          src='/images/yt_logo_rgb_dark.png'
          alt='Youtube Logo'
        />
      </Link>
      <form className='flex justify-center pl-2' onSubmit={handleSubmit}>
        <input
          className='w-40 h-8 pl-4 md:w-60 lg:w-96 outline-none text-white bg-black rounded-l-full'
          type='text'
          placeholder='Search...'
          onChange={handleChange}
          value={searchInput}
        />
        <button
          type='submit'
          className='bg-zinc-600 group px-2  rounded-r-full'
        >
          <CiSearch className=' cursor-pointer group-hover:scale-[120%] transition-transform' />
        </button>
      </form>
    </header>
  );
}
