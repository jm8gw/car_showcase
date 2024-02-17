import { MouseEventHandler } from "react";

export interface CustomButtonProps { // an interface specifies how a specific structure should look like
    title: string; 
    containerStyles?: string; // ? means it's optional
    handleClick?: // also optional, since we don't always need a handleClick for things like submit buttons
        MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
}