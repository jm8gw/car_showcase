import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";


export default async function Home({ searchParams }) { // "async" allows us to use await
  // We can immediately extract all the data from search params straight from props of a specific page
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 12,
    model: searchParams.model || '',
    // (We can also give default values to the search params)
  });

  //console.log(allCars); // Because this component (in Next.js) is currently server-side, we see the console.log only in the terminal (not in the browser's console)

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars; // If any of these conditions are true, then the data is empty

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalog</h1>
          <p>
            Browse through our extensive collection of cars. We have the best cars for you to choose from.
          </p>
        </div>
        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction}/>
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no cars</h2>
            <p>{allCars?.message}</p>
          </div>    
        )}


      </div>
    </main>
  );
}
