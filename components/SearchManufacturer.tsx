"use client";

import { SearchManufacturerProps } from '@/types'
import Image from 'next/image'
import { Combobox, Transition } from '@headlessui/react' // We use comboboxes from headlessui to create a searchable dropdown for the manufacturer
import { useState, Fragment } from 'react'

import { manufacturers } from '@/constants'; // Pre-provided list of all the manufacturers

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
    const [query, setQuery] = useState(''); // This is the state for the search query

    const filteredManufacturers = 
    query === "" 
        ? manufacturers // if query is an empty string, return all manufacturers
        : manufacturers.filter((item) => (
            item.toLowerCase()  // convert the manufacturer to lowercase
            .replace(/\s+/g, '') // remove all empty spaces with an empty string
            .includes(query.toLowerCase().replace(/\s+/g, '')) // check if the manufacturers we are filtering through includes the (sanitized) search query that we have
        ))

  return (
    <div className="search-manufacturer">
        <Combobox value={manufacturer} onChange={setManufacturer}>
            <div className='relative w-full'>
                <Combobox.Button className="absolute top-[14px]">
                    <Image 
                        src="/car-logo.svg"
                        alt="Car Logo"
                        width={20}
                        height={20}
                        className="ml-4"
                    />
                </Combobox.Button>

                <Combobox.Input 
                    className="search-manufacturer__input"
                    placeholder="Volkswagen"
                    displayValue={(manufacturer: string) => manufacturer}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}    
                >
                    <Combobox.Options>
                        {/* This is where we would map through the manufacturers that would appear on the dropdown as we type */}
                        
                        {/* If the filtered manufacturers array is empty and the query is not an empty string, we would show a "Create {query} as a new manufacturer" option */}
                        {filteredManufacturers.length === 0 && 
                        query !== "" ? (
                            <Combobox.Option
                                value={query}
                                className="search-manufacturer__option"
                            >
                                Create "{query}"
                            </Combobox.Option>
                        ): (
                            filteredManufacturers.map((manufacturer) => (
                                <Combobox.Option
                                    key={manufacturer}
                                    value={manufacturer}
                                    className={({ active }) => 
                                        `relative search-manufacturer__option 
                                        ${active ? 'bg-primary-blue text-white' 
                                        : 'text-gray-900'}`}
                                >
                                    {/* This seems a bit superfluous to me but it's how headless UI did it. Honestly can't tell the difference. */}
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                                {manufacturer}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active ? 'text-white' : 'text-teal-600'
                                                    }`}
                                                >
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            )
                        ))}
                        
                        
                        {/*<Combobox.Option value="Volkswagen" />
                        <Combobox.Option value="Toyota" />
                        <Combobox.Option value="Ford" />
                        <Combobox.Option value="Chevrolet" />
                        <Combobox.Option value="Nissan" />
                        <Combobox.Option value="Honda" />
                        <Combobox.Option value="Mercedes-Benz" />
                        <Combobox.Option value="BMW" />
                        <Combobox.Option value="Audi" />
                        <Combobox.Option value="Hyundai" />
                        <Combobox.Option value="Kia" />
                        <Combobox.Option value="Subaru" />
                        <Combobox.Option value="Mazda" />
                        <Combobox.Option value="Mitsubishi" />
                        <Combobox.Option value="Porsche" />
                        <Combobox.Option value="Lexus" />
                        <Combobox.Option value="Acura" />
                        <Combobox.Option value="Infiniti" />
                        <Combobox.Option value="Buick" />
                        <Combobox.Option value="Cadillac" />
                        <Combobox.Option value="Chrysler" />
                        <Combobox.Option value="Dodge" />
                        <Combobox.Option value="Fiat" />
                        <Combobox.Option value="GMC" />
                        <Combobox.Option value="Jeep" />
                        <Combobox.Option value="Land Rover" />
                        <Combobox.Option value="Lincoln" />
                        <Combobox.Option value="Maserati" />
                        <Combobox.Option value="Mini" />
                        <Combobox.Option value="Ram" />
                        <Combobox.Option value="Volvo" />
                        <Combobox.Option value="Tesla" />
                        <Combobox.Option value="Jaguar" />
                        <Combobox.Option value="Bentley" />
                        <Combobox.Option value="Ferrari" />
                        <Combobox.Option value="Genesis" />
                        <Combobox.Option value="McLaren" />
                        <Combobox.Option value="Rolls-Royce" />
                        <Combobox.Option value="Alfa Romeo" />
                        <Combobox.Option value="Aston Martin" />
                        <Combobox.Option value="Bugatti" />
                        <Combobox.Option value="Koenigsegg" />
                        <Combobox.Option value="Lamborghini" />
                        <Combobox.Option value="Lotus" />
                        <Combobox.Option value="Morgan" />
                        jkjk we are not doing it manually lol*/}


                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer