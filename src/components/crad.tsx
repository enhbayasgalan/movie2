'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { resourceLimits } from "worker_threads";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface el {
  backdrop_path:string,
  id:number
}

export const Crad = () => {
  const [movie, setMovies] = useState<el[]>([]);
  const router = useRouter()
  const MovieData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=db430a8098715f8fab36009f57dff9fb"
    );
    const result = await response.json();
    const movie = result.results;
    setMovies(movie);
  };

  useEffect(() => {
    MovieData();
  }, []);

  console.log(movie);
 const handleDetailMovie = (movieID:number)=>{
router.push(`/detail/${movieID}`)
 }
  return (
    <div className="w-screen">
      <Carousel className="w-full ">
        <CarouselContent  >
          {movie.map((movie , index ) => (
            <CarouselItem key={index} onClick={()=>handleDetailMovie(movie.id)}>
              <div className="h-[600px] mt-[59px] mt-[80px]">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                 />
                 <div className="p-5 space-y-4 lg:p-0">
                  <div className="flex justify-between lg:flex-col lg:space-y-1">
                    <div>
                      <h4 className="text-sm">Now Playing:</h4>
                    </div>
                  </div>
                 </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default Crad;