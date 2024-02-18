import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fetchCars } from "@/utils";
import Image from "next/image";


export default async function Home() { // "async" allows us to use await
  const allCars = await fetchCars();

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
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
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
