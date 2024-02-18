// Specifying types is very important in (and somewhat unique to) TypeScript. 
// It helps us catch errors early on and makes our code more readable and maintainable. 
// If we try to pass a prop that is not specified in the interface, TypeScript will throw an error.

import { MouseEventHandler } from "react";

export interface CustomButtonProps { // an interface specifies how a specific structure should look like
    title: string; 
    containerStyles?: string; // ? means it's optional
    handleClick?: // also optional, since we don't always need a handleClick for things like submit buttons
        MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    textStyles?: string; // additional styling things
    rightIcon?: string; // for icons on the right
    isDisabled?: boolean; // some instances will have a disabled button
}

export interface SearchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer: string) => void;
}

export interface CarProps { // Car interface
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export interface FilterProps {
    manufacturer: string;
    year: number;
    fuel: string;
    limit: number;
    model: string;
}

export interface OptionProps {
    title: string;
    value: string;
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[]; // Yeah that's right, we can have an interface inside an interface
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}