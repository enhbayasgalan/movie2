"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";
import { log } from "console";
import { Divide, Moon, Search, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface gen {
  id: string;
  name: string;
}
type gry = {
  poster_path: string;
  original_title: string;
  vote_average: number;
  release_date: number;
};
type data = {
  poster_path: string;
  id: number;
  original_title: string;
  release_date: string;
  vote_average: number;
};
type props = {
  location : string
}

export const Header = ({location}:props) => {
  const [genre, setGenre] = useState<gen[]>([]);
  const [searchValue, setSearch] = useState("");
  const [alert, setAlert] = useState(false);
  const [movie, setMovies] = useState<data[]>([]);
  const searchParams = useSearchParams();
  const genreID = searchParams.get("genreid")
    ? searchParams.get("genreid")?.split(",")
    : [];
  // console.log("movie", movie);
  const getMovieGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=db430a8098715f8fab36009f57dff9fb`
    );
    const search = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1&api_key=db430a8098715f8fab36009f57dff9fb`
    );

    const result = await response.json();

    const seacrhmovie = await search.json();
    setMovies(seacrhmovie.results);
    setGenre(result.genres);
    // console.log("asdasdas", seacrhmovie);
  };

  useEffect(() => {
    getMovieGenres();
  }, [searchValue]);
  const { setTheme, theme } = useTheme();
  const onClick=()=>{
    if(theme=="dark"){
      setTheme("light")
    }
    else{
      setTheme("dark")
    }
 
  }
  const router = useRouter();

  const handleHomePAge = () => {
    router.push(`/`);
  };

  const buttonVariants = () => {
    if (alert == false) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  };

  const onSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("value", event.target.value)
{location == "Search" && router.push(`/search/?${params}`)}
  };
  const searchValueParams = searchParams.get("value")

  // const { dark setDark } = useState("")

  // const Onclick = () => {
  //   if (dark === "dark") {
  //     setDark("light");
  //   } else {
  //     setDark("dark")
  //   }
  // }

  // console.log(genre);
  const genreOpen = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const index = genreID?.indexOf(id.toString())
    if (genreID?.includes(id.toString())){
      genreID.splice(index, index+1)
    }else{
      genreID?.push(id);
    }
    if (genreID) {
      params.set("genreid", genreID?.join(","));
    }

    router.push(`/genre/?${params.toString()}`);
  };

  const handleDetailMovie = (movieID: number) => {
    router.push(`/detail/${movieID}`);
  };
  const handleSearchResults = ()=> {
    const params = new URLSearchParams(searchParams.toString());
    params.set("value", searchValue)
    router.push(`search/?${params}`)
  }

  

  return (
    <header className="fixed top-0 inset-x-0 z-20 h-[59px] bg-background flex items-center justify-center bg-white dark:bg-black">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 px-0">
        <div className="flex items-center gap-x-2 text-indigo-700">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.83366 2.16666V18.8333M14.167 2.16666V18.8333M1.66699 10.5H18.3337M1.66699 6.33333H5.83366M1.66699 14.6667H5.83366M14.167 14.6667H18.3337M14.167 6.33333H18.3337M3.48366 2.16666H16.517C17.5203 2.16666 18.3337 2.98001 18.3337 3.98333V17.0167C18.3337 18.02 17.5203 18.8333 16.517 18.8333H3.48366C2.48034 18.8333 1.66699 18.02 1.66699 17.0167V3.98333C1.66699 2.98001 2.48034 2.16666 3.48366 2.16666Z"
              stroke="#4338CA"
            />
          </svg>
          <h4 className="italic font-bold" onClick={() => handleHomePAge()}>
            Movie Z
          </h4>
        </div>
        <div className="relative  flex items-center gap-x-3">
          <button
            onClick={() => buttonVariants()}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border h-9 px-4 py-2 w-[97px] "
          >
            <div></div>
            Genre
          </button>
          {alert == true && (
            <div className="z-50 min-w-[8rem] overflow-hidden absolute top-10 rounded-md border bg-white dark:bg-black p-5 w-[557px] h-[340px]">
              <div className="text-foreground space-y-1">
                <h3 className="text-2xl font-semibold">Genres</h3>
                <p className="text-base">See lists of movies by genre </p>
              </div>
              <div className="bg-border h-[1px] w-full border mt-[16px]"></div>
              <div className="relative flex items-center gap-2 rounded-sm outline-none p-0 cursor-default select-none mt-[10px]">
                <div className="flex flex-wrap gap-4">
                  {genre.map((el) => (
                    <div key={el.id}>
                      <button
                        onClick={() => genreOpen(el.id)}
                        className="inline-flex items-center border px-6 px-0.5 text-xs font-semibold rounded-full cursor-pointer"
                        style={theme == "light" ?{background : genreID?.includes(el.id.toString()) ? "black" : "white",
                          color : genreID?.includes(el.id.toString()) ? "white" : "black"
                        }:{background : genreID?.includes(el.id.toString()) ? "white" : "black",
                          color : genreID?.includes(el.id.toString()) ? "black" : "white"}}
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
          )}
          <div>
            <div className="relative text-muted-foreground w-[379px]">
           {location !== "Search" && (<input
                type="text"
                placeholder="search..." 
                className="flex h-9 w-full rounded-md border px-3 px-1 pl-[38px]"
                onChange={onSearchValue}
                value={searchValue}
              />)}
              {location == "Search" &&  (<input
                type="text"
                placeholder="search..." 
                className="flex h-9 w-full rounded-md border px-3 px-1 pl-[38px]"
                onChange={onSearchValue}
                value={searchValueParams || ""}
              />)}
            </div>
            {searchValue.length !== 0 && (
              <div className="rounded-xl border bg-white dark:bg-black p-3 h-[720px] text-card-foreground absolute w-[500px] ">
                <div className="flex gap-x-4 p-2 rounded-md">
                  <div  className="relative  w-[67px] h-[100px] rounded-md">
                    {movie.slice(0, 5).map((movie: data, index) => (
                      <div key={index}>
                        <div  className="flex gap-x-4 gap-2 ">
                          <img
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            className="gap-x-4 py-4"
                            onClick={() => handleDetailMovie(movie.id)}
                          />
                          <div className="flex-1 text-foreground">
                            <h4 className="w-48 lg:w-96 text-xl font-semibold truncate mt-[10px]">
                              {movie.original_title}
                            </h4>
                            <div className="flex items-center gap-x-1">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.99967 1.33301L10.0597 5.50634L14.6663 6.17968L11.333 9.42634L12.1197 14.013L7.99967 11.8463L3.87967 14.013L4.66634 9.42634L1.33301 6.17968L5.93967 5.50634L7.99967 1.33301Z"
                                  fill="#FDE047"
                                  stroke="#FDE047"
                                />
                              </svg>
                              <div className="font-medium">
                                <p className="text-sm text-foreground">
                                  {movie.vote_average}
                                  <span className="text-gray-500">/10</span>
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-between text-sm font-medium">
                              <h5>{movie.release_date}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div onClick={()=> handleSearchResults()} className="py-4 py-2.5 text-sm font-medium text-foreground mt-[656px] ">See all results for "{searchValue}"</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-3">
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" onClick={onClick}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
export default Header;
