"use client";
import Header from "@/components/header";


import { useEffect } from "react";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import Moviedetail from "@/components/Moviedetail";
import { useParams } from "next/navigation";

export default function Home() {
    const {movieID} = useParams()
    
  return (
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
  );
}