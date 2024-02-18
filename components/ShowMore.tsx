"use client"; // Because it modifies some browser functionality with useRouter

import { ShowMoreProps } from "@/types";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import { updateSearchParams } from "@/utils";


const ShowMore = ({ pageNumber, isNext }: ShowMoreProps ) => {
    const router = useRouter();

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 8; // We are going to multiply the page number by 12 to get the new limit

        const newPathName = updateSearchParams('limit', `${newLimit}`);

        router.push(newPathName, { scroll: false });
    }
  
    return (
        <div className="w-full flex-center gap-5 mt-10">
            {!isNext && (
                <CustomButton
                    title="Show More"
                    btnType="button"
                    containerStyles="bg-primary-blue rounded-full text-white"
                    handleClick={handleNavigation}
                />
            )}
        </div>
  )
}

export default ShowMore