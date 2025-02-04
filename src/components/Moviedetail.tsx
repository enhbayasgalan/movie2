"use client";

import { log } from "console";
import { use, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type de = {
  original_title: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  release_date: number;
  runtime: number;
  overview: string;
  title: string;
  id: number;
  genres : Array<gn> | undefined;
}
type gn ={
  id : number;
  name : string

}
type props = {
  movieID: string | string[] | undefined;
};
type name = {
  cast : Array<nm>;
  crew : Array<dr>
};
type nm = {
  name : string
}
type dr = { 
  name : string
}
type similar = {
  poster_path : string;
  id : number
}
// api_key=db430a8098715f8fab36009f57dff9f
const Moviedetail = ({ movieID }: props) => {
  const [movie, setMovies] = useState<de | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [name2, setName] = useState<name | null>(null);
  const [similar, setSimilar] = useState< similar[]>([]);
  const [trailer, setTrailer] = useState("")
  const [display, setDisplay] = useState(false)
const router = useRouter()
  const MovieData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?language=en-US&&api_key=db430a8098715f8fab36009f57dff9fb`
      );
      const name = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US&&api_key=db430a8098715f8fab36009f57dff9fb`
      );
      const similar = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&&api_key=db430a8098715f8fab36009f57dff9fb`
      );
      const video = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US&&api_key=db430a8098715f8fab36009f57dff9fb`
      )
      const result = await response.json();
      const trailer = await video.json()
      const name2 = await name.json();
      const similar2 = await similar.json();
      const movie = result;
      setMovies(movie);
      setName(name2);
      setTrailer(trailer.results[0].key)
      setSimilar(similar2.results);
      setLoading(false);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    MovieData();
  }, [movieID]);

  console.log(movie);
  console.log(name2);
  console.log(trailer);
  
  console.log("similar", similar);
  const handleDetailMovie = (movieID:number)=>{
    router.push(`/detail/${movieID}`)
     }
  const genres = movie?.genres
  return (<>
   {display == true && ( <div onClick={()=> setDisplay(false)} className="absolute w-screen h-[2000px] flex items-center justify-center bg-black/80 fixed inset-0 z-50 ">
      <div className="w-[512px] h-[280px] ">
        <iframe src={`https://www.youtube.com/embed/${trailer}`}></iframe>
      </div>
    </div>)}
    <div className="w-screen flex flex-col items-center">
      {isLoading == false ? (
        <div className="mt-8 mb-4 w-[1080px] px-5 flex justify-between lg:mt-[52px] lg:mb-6 lg:px-0 py-8">
          <div className="">
            <h1 className="break-words text-2xl font-bold w-52 lg:w-fit lg:text-4xl">
              {movie?.title}
            </h1>
            <h4 className="text-sm lg:text-lg">
              {movie?.release_date} · PG · {movie?.runtime}
            </h4>
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
                    <p className="text-foreground text-sm">
                      {movie?.vote_average}/10
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">1.3k</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className=" flex gap-x-8 mb-8">
        <div className="overflow-hidden relative w-[290px] h-[428px] rounded">
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 z-10 bg-black/40"></div>
          <div className="relative overflow-hidden w-[375px] lg:w-[760px] h-[211px] lg:h-[428px] lg:rounded">
            <img
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            />
          </div>
          <div className="absolute left-6 bottom-6 z-20">
            <div className="flex items-center text-white space-x-3">
              <button onClick={()=> setDisplay(true)} className="inline-flex items-center justify-center gap-2 h-9 w-9 rounded-full bg-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.33301 2L12.6663 8L3.33301 14V2Z" stroke="black" />
                </svg>
              </button>
              <p>Play trailer</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 lg:px-0">
        <div className="flex gap-x-[34px]">
          <div className="space-y-5 mb-5">
            <div className="flex flex-wrap gap-3 w-[1080px]">
           {genres?.map((genre:gn)=>(
               <div key={genre.id} className="inline-flex items-center border px-2.5 py-0.5 font-semibold text-foreground rounded-full text-xs">
               {genre.name}
             </div>
           ))}
            
            </div>
            <p className="text-base w-[1080px]">{movie?.overview}</p>
          </div>
        </div>
        <div className="space-y-5 text-foreground mb-8">
          <div className="space-y-1">
            <div className="flex pb-1">
              <h4 className="font-bold w-16 mr-[50px]">Director</h4>
              <div className="flex flex-1 flex-wrap">
                <p>{name2?.crew[1]?.name}</p>
              </div>
            </div>
            <div className="bg-border h-[1px] w-full bg-gray-200"></div>
          </div>
          <div className="space-y-1">
            <div className="flex pb-1">
              <h4 className="font-bold w-16 mr-[50px]">Writers</h4>
              <div className="flex flex-1 flex-wrap"></div>
            </div>
            <div className="shrink-0 bg-border h-[1px] w-full my-1 bg-gray-200"></div>
          </div>
          <div className="space-y-1">
            <div className="flex pb-1">
              <h4 className="font-bold w-16 mr-[50px]">Stars</h4>
              <div className="flex flex-1 flex-wrap">
                <span>
                  {name2?.cast[0]?.name}
                  <span className="mx-2">·</span>
                </span>
                <span>
                  {name2?.cast[2]?.name}
                  <span className="mx-2">·</span>
                </span>
                <span>
                  {name2?.cast[3]?.name}
                  <span className="mx-2">·</span>
                </span>
                <span>
                  {name2?.cast[4]?.name}
                  <span className="mx-2">·</span>
                </span>
                <span>{name2?.cast[5]?.name}</span>
              </div>
            </div>
            <div className="shrink-0 bg-border h-[1px] w-full my-1 bg-gray-200"></div>
          </div>
        </div>
        <div className="pb-8 lg:pb-[112.62px]">
          <div className="flex justify-between mb-8">
            <h3 className="text-2xl font-semibold">More like this</h3>
            <div className="inline-flex items-center justify-center gap-2 underline-offset-4 h-9 px-4 py-2">
              See more
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33301 7.99967H12.6663M12.6663 7.99967L7.99967 3.33301M12.6663 7.99967L7.99967 12.6663"
                  stroke="#18181B"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 lg:gap-8 grid grid-cols-5 ">
            {similar.slice(0, 5).map((movie:similar, index:number) => (
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                className=" w-[190px] h-[281px]"
                key={index}
                onClick={()=>handleDetailMovie(movie.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div></>
  );
};
export default Moviedetail;
