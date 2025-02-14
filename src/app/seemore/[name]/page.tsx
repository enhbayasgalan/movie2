"use client";
import Header from "@/components/header";


import { Upcoming } from "@/components/upcoming";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
const {name} = useParams()

if(name){


  return (
    <Suspense>
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
    </Suspense>
  );
}}