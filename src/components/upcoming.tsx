'use client'

import { title } from "process";
import { useEffect } from "react";
import { useState } from "react";

interface e {
  poster_path:string
  vote_average:number
  original_title:string
}
type props ={
  name:string,
  title:string
}
export const Upcoming = (props:props) => {
    const [movie, setMovies] = useState<e[]>([]);
    
      const MovieData = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${props.title}?language=en-US&page=1&api_key=db430a8098715f8fab36009f57dff9fb`
        );
        const result = await response.json();
        const movie = result.results;
        setMovies(movie);
      };
    
      useEffect(() => {
        MovieData();
      }, []);
    
      console.log(movie);
    return(
      <div>
      <section className="page-primary py-8 lg:py-13 space-y-8">
      <div className="w-[1280px] flex flex-col justify-center   justify-between ">
        <div className="flex items-center justify-center">
          <h3 className="text-foreground text-2xl font-semibold ">
            {props.name}
          </h3>
        </div>
        <div className="flex grid grid-cols-5 justify-between items-center justify-center py-8">
          {movie.slice(0, 10).map((movie, index) => (
            <div className="w-[230px] overflow-hidden rounded-lg bg-secondery space-y-1 flex items-center " key={index}>
              <div className="overflow-hidden flex flex-col justify-center w-full h -[400px] ">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  className="w-full h-[340px] justify-center "
                />
                <div className="h-[60px] w-full bg-gray-500 border ">

                  <p className="text-foreground text-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99967 1.3335L10.0597 5.50683L14.6663 6.18016L11.333 9.42683L12.1197 14.0135L7.99967 11.8468L3.87967 14.0135L4.66634 9.42683L1.33301 6.18016L5.93967 5.50683L7.99967 1.3335Z"
                      fill="#FDE047"
                      stroke="#FDE047"
                    />
                  </svg>
                    {movie.vote_average}/10
                  </p>
                  <p>{movie.original_title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    
    

    </div>
    
    )
}
 