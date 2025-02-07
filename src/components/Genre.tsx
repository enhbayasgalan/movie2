"use client";

import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { split } from "postcss/lib/list";

type gen = {
  id: string;
  name: string;
  poster_path: string;
  vote_average: number;
  title: string;  
};
type Movies = {
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
  
};
type Movie = {
  poster_path: string;
  id: number;
  vote_average : number
};

export const Genre = () => {
  const [genre, setGenre] = useState<gen[]>([]);
  const [movies, setMovies] = useState<Movies | undefined>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const genreID = searchParams.get("genreid")
    ? searchParams.get("genreid")?.split(",")
    : [];

  // console.log("genreID", genreID);

  const genreMovie = async () => {
    try {
      if(genreID){
      const gener = await fetch(
        ` https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreID.join(
          ","
        )}&page=1&api_key=db430a8098715f8fab36009f57dff9fb`
      );
      // console.log("ajillaa");
    

      const result = await gener.json();
      // console.log(result);
      setMovies(result);
      // console.log(result);
    }
    } catch (error) {
      console.error();
    } finally {
    }
  };
  useEffect(() => {
    genreMovie();
  }, [searchParams]);
  // console.log(movies);
  const movie = movies?.results;

  const genreOpen = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const index = genreID?.indexOf(id.toString())
    if (genreID?.includes(id.toString())){
      genreID.splice(index, index+1)
    }else{
      genreID?.push(id);
    }
  
    if(genreID){
      params.set("genreid", genreID.join(","));
    }

    console.log(index);
    // console.log(searchParams);

    router.push(`?${params.toString()}`);
  };
  console.log(searchParams);

  const getMovieGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=db430a8098715f8fab36009f57dff9fb`
    );
    const result = await response.json();
    setGenre(result.genres);
  };

  useEffect(() => {
    getMovieGenres();
  }, []);

  const handleDetailMovie = (movieID:number)=>{
  router.push(`/detail/${movieID}`)
  }
console.log("genre id" ,genreID);



  return (
    <div className="pt-[59px]">
      <div className="w-[1280px] pt-[52px] py-8">
        <h2 className="w-full mb-8 text-2xl font-semibold text-foreground">
          Search Filters
        </h2>
        <div className="flex">
          <div className="w-fit top-[111px] ">
            <div className="space-y-5">
              <div className="">
                <h3 className="text-2xl font-semibold">Genres</h3>
                <p className="text-base">See lists of movies by genre</p>
              </div>
              <div className="flex flex-wrap gap-4 w-[387px]">
                {genre.map((el) => (
                  <div key={el.id}>
                    <button

                      onClick={() => genreOpen(el.id)}
                      className="inline-flex items-center border px-6 px-0.5 text-xs font-semibold rounded-full"
                      style={{background : genreID?.includes(el.id.toString()) ? "black" : "white",
                        color : genreID?.includes(el.id.toString()) ? "white" : "black"
                      }}
                    >
                      {el.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-border w-[1px] border h-screen mx-4"></div>
          <div className="flex-1 pr-12">
            <h4 className="text-xl font-semibold">
              {movies?.total_results} titles
            </h4>
            <div className="flex flex-wrap gap-5 lg:gap-x-12 lg:gap-y-8 py-8">
              {movies?.results?.map((genre: Movie, index) => (
                <div key={index} className="rounded-lg space-y-1 bg-red-300">
                  <img
                    key={genre.id}
                    src={`https://image.tmdb.org/t/p/original/${genre.poster_path}`}
                    className="w-[165px] h-[244px] "
                    onClick={()=>handleDetailMovie(genre?.id)}
                  />
                  <div className="p-2">
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
                        <p className="text-foreground text-sm">{genre?.vote_average}<span className="text-gray-500">/10</span></p>
                      </div>
                    </div> 
                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
