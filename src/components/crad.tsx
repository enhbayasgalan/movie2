"use client";

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
  backdrop_path: string;
  id: number;
  original_title: string;
  vote_average: number;
  overview: string;
}
type props = {
  movieID: string | string[] | undefined;
};

export const Crad = () => {
  const [movie, setMovies] = useState<el[]>([]);
  const [trailer, setTrailer] = useState("");
  const [display, setDisplay] = useState(false);
  const router = useRouter();
  const [trailerLoading, setTrailerLoading] = useState(false)
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

  console.log(trailer);
  const handleDetailMovie = (movieID: number) => {
    router.push(`/detail/${movieID}`);
  };
  const playTrailer = async (id:number) => {
    try{
      setTrailerLoading(true)
      const video = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&&api_key=db430a8098715f8fab36009f57dff9fb`
      );
        const trailer = await video.json()
      setTrailer(trailer.results[0].key);
    }catch(error){
      console.error();
    }finally{
      setTrailerLoading(false)
    }
    if(trailerLoading == false){
      setDisplay(true)
    }

  }
  return (
    <div className="w-screen">
               {display == true && (
        <div
          onClick={() => setDisplay(false)}
          className=" w-screen h-screen flex items-center justify-center bg-black/80 fixed inset-0 z-50 "
        >
          <div className="w-[512px] h-[280px] ">
            <iframe
              src={`https://www.youtube.com/embed/${trailer}`}
              className="w-[512px] h-[280px]"
            ></iframe>
          </div>
        </div>
      )}
      <Carousel className="w-full">
        <CarouselContent>
          {movie.map((movie, index) => (
            <CarouselItem
              key={index}
            
            >
     
              <div className="relative">
                <div className="h-[600px] mt-[59px] mt-[80px]"
                  onClick={() => handleDetailMovie(movie.id)}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  />
                </div>
                <div className="static text-foreground lg:absolute lg:left-[140px] lg:translate-y-2 lg:text-white z-10 top-[20px] mt-[200px]">
                  <div className="p-5 space-y-4 lg:p-0">
                    <div className="flex justify-between lg:flex-col">
                      <div>
                        <h4 className="text-sm">Now Playing:</h4>
                        <h3 className="w-52 text-2xl font-semibold">
                          {movie.original_title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <svg
                          className="lucide lucide-star"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.9997 2.3335L17.6047 9.63683L25.6663 10.8152L19.833 16.4968L21.2097 24.5235L13.9997 20.7318L6.78967 24.5235L8.16634 16.4968L2.33301 10.8152L10.3947 9.63683L13.9997 2.3335Z"
                            fill="#FDE047"
                            stroke="#FDE047"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="font-medium">
                          <p className="text-foreground text-sm lg:text-white">
                            {movie.vote_average}
                            <span className="text-gray-500">/10</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="w-[302px] text-sm line-clamp-5">
                      {movie.overview}
                    </p>
                    <button onClick={() => playTrailer(movie.id)} className="inline-flex items-center justify-center gap-2  rounded-md  font-medium h-9 px-4 py-2  bg-white w-[144px] ">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.33301 2L12.6663 8L3.33301 14V2Z"
                          stroke="#18181B"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4 className="text-sm z-10  text-black">Watch Trailer</h4>
                    </button>
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
