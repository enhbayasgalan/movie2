"use client";


import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { PaginationDynic } from "./Pagination";
import { useSearchParams } from "next/navigation";
interface e {
  poster_path: string;
  vote_average: number;
  original_title: string;
  id: number
  total_pages: number;
}
type props = {
  name: string | string[]  ,
  title: string  | string[]
};
type Response = {
  results : Array<e>,
  total_pages : number
}
type el = {

}
export const Upcoming = (props: props) => {
  const [movie, setMovies] = useState<Response | null>(null);
  const [folder, setFolder] =useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1;
  const nameValue = Array.isArray(props.name) ? props.name[0] : props.name;
  const MovieData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${props.title}?language=en-US&page=${currentPage}&api_key=db430a8098715f8fab36009f57dff9fb`
    );
 
    const result = await response.json();
   setMovies(result);
  };
  const SimilarMovie = async() => {
    try{
      const responseSimilar = await fetch (`https://api.themoviedb.org/3/movie/${props.title}/similar?language=en-US&page=${currentPage}&api_key=db430a8098715f8fab36009f57dff9fb`)
      const resultSimilar = await responseSimilar.json()
      setMovies(resultSimilar)
    }catch(err){
      console.log(err);
      
    }

  }
const folderset = () => {
  const path = window.location.pathname
  if (path.split("/").includes("seemore")){ 
  
    setFolder("seemore")
  }else if(path == "/"){
    setFolder("app")
  }
console.log(path);

}
  useEffect(() => {
  
   {parseInt(nameValue)/1==parseInt(nameValue) == true ? SimilarMovie() : MovieData();}
    folderset()
    
  }, [currentPage]);
console.log(folder);

  console.log(movie);
  const handleDetailMovie = (movieID:number)=>{
    router.push(`/detail/${movieID}`)
     }
const name = props.title
const movies = movie?.results

   return (
    <div>
      <section className="py-8 top-10 lg:py-13 space-y-8">
        <div className="max-w-[1280px] w-full flex flex-col justify-center justify-between ">
          <div className="flex items-center justify-center">
            <h3 className="text-foreground text-2xl font-semibold w-full px-4 h-9">
              {props.name}
            </h3>
           {folder == "app" &&( <p className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 " onClick={()=> router.push(`/seemore/${name}`)}>
              Seemore...
            </p>)}
          </div>
         { folder == "app" && (<div className="flex flex-wrap gap-5 lg:gap-8 py-8 px-4 lg:px-0">
            {movies?.slice(0, 10).map((movie:e, index) => (
              <div
                className="lg:w-[230px] w-[157.5px] overflow-hidden h-fit relative rounded-md  bg-gray-400/30 space-y-1 flex items-center mt-[15px] "
                key={index}
                onClick={() => handleDetailMovie(movie.id)}
              >
                <div className="overflow-hidden flex flex-col justify-center max-w-full h- [400px] group">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    className="w-full h-auto justify-center "
                  
                  />
                  <div className="absolute inset-0 h-[340px] dark:group-hover:bg-gray-500/30 group-hover:bg-black/20"></div>
                  <div className="p-2 ">
                    <div className="flex items-center gap-x-1 ">
                      <svg
                        width="17"
                        height="18"
                        viewBox="0 0 17 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.18913 3.33301L10.2491 7.50634L14.8558 8.17968L11.5225 11.4263L12.3091 16.013L8.18913 13.8463L4.06913 16.013L4.85579 11.4263L1.52246 8.17968L6.12913 7.50634L8.18913 3.33301Z"
                          fill="#FDE047"
                          stroke="#FDE047"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="font-medium">
                        <p className="text-foreground text-sm">{movie?.vote_average}<span className="text-gray-500">/10</span></p>
                      </div>
                    </div> 
                    <div className="h-14 line-clamp-2 text-lg ">{movie?.original_title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>)}
          {folder == "seemore" && (<div className="flex flex-wrap px-4 lg:px-0 items-center justify-center py-8 gap-8  ">
            {movie?.results.map((movie, index) => (
              <div
                className="lg:w-[230px] w-[157.5px]  overflow-hidden rounded-lg space-y-1 flex items-center "
                key={index}              >
                <div className="overflow-hidden rounded-lg flex flex-col justify-center max-w-full h -[400px] mt-[30px] ">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    className="max-w-full h-auto justify-center rounded-lg"
                    onClick={() => handleDetailMovie(movie.id)}
                  />
                  <div className="h-[90px] max-w-full bg-gray-400/30 ">
                    <p className="text-foreground text-sm flex">
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
            ))}    {movies && (<PaginationDynic total_page={movie?.total_pages}/>)}
          </div>)}
    
        </div>
      </section>
    </div>
  );
};
