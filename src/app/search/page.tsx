"use client";
import Header from "@/components/header";

import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SearchResults } from "@/components/Searchresults";

export default function Home() {
    
 
  return (
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
  );
}