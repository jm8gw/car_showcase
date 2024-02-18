import { manufacturers } from "@/constants";
import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, fuel, limit, model } = filters; // Destructure the filters

    const headers = { // Set the headers for the request (API Key and Host)
        'X-RapidAPI-Key': 'f344f36607mshb3e139b52dbc2a5p1dac4ejsn065129098322',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    try {

        const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
            headers: headers, 
        }); // Fetch the cars from the API

        const result = await response.json(); // Convert the response to JSON

        return result; // Return the JSON result (the actual cars)

    } catch (error) {
        console.error(error); // Log any errors
    }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base price per day
    const pricePerMile = 0.5; // Price per mile
    const ageFactor = 0.05; // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * pricePerMile;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate the total rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0); // Return the total rate per day
}

/* We might not have access to the car images from the API, so this function may fail */
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;
  
    url.searchParams.append('customer', 'hrjavascript-mastery'); // process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ''
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);
  
    return `${url}`;
  } 