'use client'

import { useState } from "react";
import { useEffect } from "react";

interface de {
  original_title: string;
  vote_avarage: number
}
type props = {
    movieID : number
}
// api_key=db430a8098715f8fab36009f57dff9f
const Moviedetail = ({movieID}:props) => {
  const [movie, setMovies] = useState<de[]>([]);
  const [isLoading, setLoading] = useState(false)

  const MovieData = async () => {
    try{
        setLoading(true)
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US&&api_key=db430a8098715f8fab36009f57dff9fb`
          );
          const result = await response.json();
          const movie = result;
          setMovies(movie);
          setLoading(false)
    }catch(error){
        console.error();  
    }
  
  };

  useEffect(() => {
    MovieData();
  }, [movieID]);

  console.log(movie);

  return (
    <div className="w-screen flex flex-col items-center">
   {isLoading == false ? (  <div className="mt-8 mb-4 w-[1080px] px-5 flex justify-between lg:mt-[52px] lg:mb-6 lg:px-0 py-8">
        <div className="">
          <h1 className="break-words text-2xl font-bold w-52 lg:w-fit lg:text-4xl">
            {movie?.title}
          </h1>
          <h4 className="text-sm lg:text-lg">2024.12.19 · PG · 1h 50m</h4>
        </div>
        <div className="text-xs h-[72px]">
          <h5 className="hidden lg:block">Rating</h5>
          <div className="flex items-center py-[2px] gap-x-1">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9997 2.33301L17.6047 9.63634L25.6663 10.8147L19.833 16.4963L21.2097 24.523L13.9997 20.7313L6.78967 24.523L8.16634 16.4963L2.33301 10.8147L10.3947 9.63634L13.9997 2.33301Z"
                fill="#FDE047"
                stroke="#FDE047"
              />
            </svg>
            <div>
                <div className="flex items-center gap-x-1">
                    <div className="font-medium">
                        <p className="text-foreground text-sm">{movie?.vote_average}/10</p>
                    </div>
                </div>
                <p className="text-muted-foreground">1.3k</p>
            </div>
          </div>
        </div>
      </div>):null}
      <div className="flex gap-x-8 mb-8">
        <div className="overflow-hidden relative hidden w-[290px] h-[428px] rounded">
            <img />
        </div>
      </div>
    </div>
  );
};
export default Moviedetail;
