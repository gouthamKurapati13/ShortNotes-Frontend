import React from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate;

  const handleSearch = () => {}

  const onLogout = () => {
    navigate('/login');
  };

  const onClearSearch = () => {
    setSearchQuery("");
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-bold text-black py-2'>Notes</h2>
      <SearchBar value={searchQuery} onLogout={onLogout} onChange={({ target }) => {
          setSearchQuery(target.value);
        }} 
        handleSearch={handleSearch} onClearSearch={onClearSearch} 
      />
      <ProfileInfo username={"Goutham Kurapati"} />
    </div>
  )
}

export default Navbar
