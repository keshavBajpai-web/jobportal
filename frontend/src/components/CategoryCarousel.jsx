import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

   const searchJobHandler = (query) => {
          dispatch(setSearchedQuery(query))
          navigate("/browse")
      }

  return (
    <div className="w-full py-2">
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent className="-ml-2">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <Button
              onClick={()=>searchJobHandler(cat)}
                variant="outline"
                className="w-full h-12 rounded-full text-sm md:text-base font-medium 
                hover:bg-blue-600 hover:text-white transition duration-300 
                border-blue-200 shadow-sm"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;