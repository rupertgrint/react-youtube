import React, { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
