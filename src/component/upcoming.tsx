import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"


export const Upcoming = () => {
    return(
        <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1 flex items-center justify-center mt-[59px] mt-[80px] ">
              <span className="text-4xl font-semibold">{index + 1}</span>
              <img src={`https://image.tmdb.org/t/p/w500//zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg`} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    )
}