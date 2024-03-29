import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";


export default async function Home({ searchParams }: { searchParams: any }) { 
  // We can immediately extract all the data from search params straight from props of a specific page (the magic of server-side rendering!)
  
  /* One great advantage of server-side rendering as opposed to working with many manually mangaged states in client-side
     is that since the URL gets changed based on our search params, it is very easy 
     to share the link with someone else and have them see the same results as we do.
     With client-side rendering, the URL stays sanitized and doesn't change, so any 
     attempt to share will bring the person back to the general home page. 

     Client-side rendering is great for user experience, but server-side rendering is great for sharing, SEO, and sometimes quicker performance/loading. 
  */
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 8,
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

            <ShowMore 
              pageNumber={(searchParams.limit || 8) / 8} // We are going to divide the page number by 12 to get the actual page number
              isNext={(searchParams.limit || 8) > allCars?.length} 
              /* API doesn't give us the total number of pages, 
               so we calculate that by checking if the limit (under current params) 
               is greater than the number of all cars generated 
              (if that is the case, we don't have any new cars to show) */
            />
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
