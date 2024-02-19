"use client"; // Definitely needs to be client-side because we are using React hooks (useState, useEffect, etc.)

import SearchManufacturer from "./SearchManufacturer";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}> 
    {/* We can add other classes to the button within the dynamic brackets (${}) 
    -ml-3 allows it to "jump into" the input a little bit  */}
        <Image 
            src="/magnifying-glass.svg"
            alt="Search Icon"
            width={40}
            height={40}
            className="object-contain"
        />
    </button>
)


const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState(''); // This is the state for the manufacturer search
    const [model, setModel] = useState(''); // This is the state for the model search
    const router = useRouter(); // We are going to use the router to update the URL when we search

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevents the form from refreshing the page
        
        console.log('searching...')

        if (manufacturer === '' && model === '') {
            return alert('Please enter a manufacturer and model')
        }

        updateSearchParams( // Update the search params on search button click
            model.toLowerCase(),
            manufacturer.toLowerCase()
        )
    }

    // Basically, server-side rendering (provided by NEXT.js) is going to give us the ability to use search params from the URL, 
    // as opposed to relying on states in client-side rendering
    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search); // If there was something there before, we need to know it and store it right here

        if (model) {
            searchParams.set('model', model);
        } else {
            searchParams.delete('model'); // If the model is empty, we want to remove it from the search params
        }

        if (manufacturer) {
            searchParams.set('manufacturer', manufacturer);
        } else {
            searchParams.delete('manufacturer'); 
        }

        const newPathName = `${window.location.pathname}?${searchParams.toString()}`; // We are going to use the search params to update the URL

        router.push(newPathName, {scroll: false}); // We are going to push the new path name to the router
        // router comes from the next/navigation package
    }


  return (
    <form className="searchbar"
        onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacturer 
                manufacturer={manufacturer}
                setManufacturer={setManufacturer}
            />
            <SearchButton otherClasses="sm:hidden" /> {/* Reusable only for the search bar file, so we will declare it above instead of in components */}
        </div>
        <div className="searchbar__item">
            <Image 
                src="/model-icon.png"
                alt="Car Model Icon"
                width={25}
                height={25}
                className="absolute w-[20px] h-[20px] ml-4"
            />
            <input 
                type="text"
                name="model"
                value={model}
                placeholder="Tiguan"
                className="searchbar__input"
                onChange={(e) => setModel(e.target.value)}
            />
            <SearchButton otherClasses="sm:hidden" />
        </div>
        <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar