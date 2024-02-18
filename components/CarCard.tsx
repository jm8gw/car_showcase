"use client"; // This component is going to use hooks, so it needs to be client-side

import { useState } from "react"; // We need to be able to manage the "open" state of the modal that's going to pop up when we click on the car card
import Image from "next/image";

import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import { calculateCarRent } from "@/utils";
import CarDetailsModal from "./CarDetailsModal";

interface CarCardProps {
    car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
    const { city_mpg, year, make, model, transmission, drive } = car; // Destructuring the car object to get the properties we need

    const carRent = calculateCarRent(city_mpg, year); // Uses the rent calculation utility function we made in utils

    const [isOpen, setIsOpen] = useState(false); // Indicates the modal state (open or not open)

  return (
    <div className="car-card group">
        <div className="car-card__content">
            <h2 className="car-card__content-title">
                {make} {model}
            </h2>
        </div>

        <p className="flex mt-6 text-[32px] font-extrabold">
            <span className="self-start text-[14px] font-semibold">
                $
            </span>
            {carRent}
            <span className="self-end text-[14px] font-medium">
                /day
            </span>
        </p>

        <div className="relative w-full h-40 my-3 object-contain">
            <Image src="/hero.png" 
                alt="Car Image" 
                fill
                priority
                className="object-contain"/>
        </div>

        <div className="relative flex w-full mt-2">
            <div className="flex group-hover:invisible w-full justify-between text-gray">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/steering-wheel.svg" width={20} height={20} alt="Steering Wheel" />
                    <p className="text-[14px]">
                        {transmission === 'a' ? 'Automatic' : 'Manual'}
                    </p>
                </div>
            </div>
            <div className="flex group-hover:invisible w-full justify-between text-gray">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/tire.svg" width={20} height={20} alt="Tire" />
                    <p className="text-[14px]">
                        {drive.toUpperCase()}
                    </p>
                </div>
            </div>
            <div className="flex group-hover:invisible w-full justify-between text-gray">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/gas.svg" width={20} height={20} alt="Gas" />
                    <p className="text-[14px]">
                        {city_mpg} MPG
                    </p>
                </div>
            </div>
            
            <div className="car-card__btn-container">
                <CustomButton 
                    title="View More"
                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                    rightIcon='/right-arrow.svg'
                    handleClick={() => setIsOpen(true)}
                />
            </div>
        </div>

        <CarDetailsModal isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />

    </div>
  )
}

export default CarCard