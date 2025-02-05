"use client";

import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type gen = {
  id: string;
  name: string;
  poster_path: string;
}
type Movies = {
  results: Array<Movie>;
  total_pages : number
};
type Movie = {
  poster_path: string;
  id: string;

};

export const Genre = () => {
  // const [genreID, setGenreID] = useQueryState("genreid");
  const [genre, setGenre] = useState<gen[]>([]);
  const [movies, setMovies] = useState<Movies | undefined>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const genreID = (searchParams.get("genres") || "").split(",");
  const genreMovie = async () => {
    try {
      const gener = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreID.join(",")}&page=1&api_key=db430a8098715f8fab36009f57dff9fb`
      );
      const result = await gener.json();
      setMovies(result);
      console.log(result);
      
    } catch (error) {
      console.error();
    } finally {
    }
  };
  useEffect(() => {
    genreMovie();
  }, [genreID]);
  // console.log(movies);
  const movie = movies?.results;
  

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

  const genreOpen = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    genreID.push(id);
    params.set("genreid", genreID.join(","));

 
    router.push(`?${params.toString()}`);
  };



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
                    >
                      {el.name}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 12L10 8L6 4" stroke="#09090B" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-border w-[1px] border h-screen mx-4"></div>
          <div className="flex-1 pr-12">
            <h4 className="text-xl font-semibold">42656 titles</h4>
            <div className="flex flex-wrap gap-5 lg:gap-x-12 lg:gap-y-8 py-8 ">
            {movie?.map((genre: Movie) => (
                <img
                  key={genre.id}
                  src={`https://image.tmdb.org/t/p/original/${genre.poster_path}`}
                  className="w-[165px] h-[244px] "
                />
            ))}
            <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

