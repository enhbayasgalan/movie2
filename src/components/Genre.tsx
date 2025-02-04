'use client'

import { useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

interface gen {
    id: number;
    name: string;
}


export const Genre = () => {
    const [genreID, setGenreID] = useQueryState("genreid")
    const [genre, setGenre] = useState<gen[]>([]);
    const [movies, setMovies] = useState<Response>()
    const router = useRouter();
    const  genreMovie = async () => {
        const gener = await  fetch(
            `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreID}&page=1&api_key=db430a8098715f8fab36009f57dff9fb`
        )
        const result = await gener.json()
        setMovies(result)

    }
    useEffect(()=>{
        genreMovie()
    },[])
    console.log(movies);

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

    const genreOpen = (id:number)=> {
        router.push(`/genre?genreid=${id}`)
      }
    
    return(
        <div className="w-[1280px] pt-[59px] py-8">
            <h2 className="w-full mb-8 text-2xl font-semibold text-foreground">Search Filters</h2>
            <div className="flex space-y-8">
                <div className="static h-fit w-full top-[111px] w-[387px]">
                    <div className="space-y-5">
                        <div className="text-foreground space-y-1">
                            <h3 className="text-2xl font-semibold">Genres</h3>
                            <p className="text-base">See lists of movies by genre</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                        {genre.map((el) => (
                        <div key={el.id}>
                        <button onClick={()=>genreOpen(el.id)} className="inline-flex items-center border px-6 px-0.5 text-xs font-semibold rounded-full cursor-pointer">
                        {el.name}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12L10 8L6 4"
                            stroke="#09090B"
                          />
                        </svg>
                      </button>
                    </div>
                      ))}
                        </div>
                    </div>
                </div>
                <div className="shrink-0 bg-border w-[1px] border h-screen mx-4 "></div>
            </div>
        </div>
    )
}