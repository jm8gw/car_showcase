"use client";

import Image from "next/image";
import CustomButton from "./CustomButton";

const Hero = () => {
    const handleScroll = () => {
        window.location.href="/#discover";
        /*
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
        */
    };


  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">Find, book, or rent a car -- quickly and easily!</h1>
        
            <p className="hero__subtitle">We have the best cars for you to choose from. Book now and get the best deals!</p>

            <CustomButton 
                title="Explore Cars"
                containerStyles="bg-primary-blue text-white mt-10 rounded-full"
                handleClick={handleScroll}
            />
        </div>

        <div className="hero__image-container">
            <div className="hero__image">
                <Image 
                    src="/hero.png"
                    alt="Hero Image"
                    fill
                    className="object-contain"
                />
            </div>
            <div className="hero__image-overlay"/>
        </div>
    </div>
  )
}

export default Hero