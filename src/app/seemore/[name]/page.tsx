"use client";
import Header from "@/components/header";

import { Crad } from "@/components/crad";
import { Upcoming } from "@/components/upcoming";
import { useEffect } from "react";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { useParams } from "next/navigation";

export default function Home() {
  const [movie, setMovies] = useState([]);
const {name} = useParams()
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

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Header location="Seemore"/>
        <div className="w-screen h-[60px]"></div>
        <Upcoming name={name} title={name} />


        <Footer />
      </div>
    </ThemeProvider>
  );
}