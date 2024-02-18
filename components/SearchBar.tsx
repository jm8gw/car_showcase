"use client"; // Definitely needs to be client-side because we are using React hooks (useState, useEffect, etc.)

import SearchManufacturer from "./SearchManufacturer";

import { useState } from "react";

const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState(''); // This is the state for the manufacturer search

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('searching...')
    }

  return (
    <form className="searchbar"
        onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacturer 
                manufacturer={manufacturer}
                setManufacturer={setManufacturer}
            />
        </div>
    </form>
  )
}

export default SearchBar