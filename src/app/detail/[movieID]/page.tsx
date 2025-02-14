"use client";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import Moviedetail from "@/components/Moviedetail";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
    const {movieID} = useParams()
    
  return (
    <Suspense>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Header location="detail"/>
        <Moviedetail movieID={movieID}/>
        <Footer />
      </div>
    </ThemeProvider>
    </Suspense>
  );
}