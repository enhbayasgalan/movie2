"use client";
import Header from "@/components/header";

import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SearchResults } from "@/components/Searchresults";
import { Suspense } from "react";

export default function Home() {
    
 
  return (
    <Suspense>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Header location="Search"/>
        <SearchResults />
        <Footer />
      </div>
    </ThemeProvider>
    </Suspense>
  );
}