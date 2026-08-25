import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40k-1 Lakh", "1-5 Lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full rounded-xl border bg-white p-3 sm:p-4 shadow-sm">

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Filters
      </h2>

      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-3 sm:space-y-4"
      >

        {filterData.map((section, index) => (
          <div key={index}>

            <h3 className="mb-2 sm:mb-3 text-sm sm:text-base font-semibold text-gray-800">
              {section.filterType}
            </h3>

            <div className="space-y-0.5 sm:space-y-1">

              {section.array.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 sm:gap-3 rounded-md px-1.5 sm:px-2 py-1 sm:py-1.5 hover:bg-gray-100 transition"
                >
                  <RadioGroupItem
                    value={item}
                    id={`${section.filterType}-${i}`}
                  />

                  <label
                    htmlFor={`${section.filterType}-${i}`}
                    className="cursor-pointer text-xs sm:text-sm text-gray-700 leading-5"
                  >
                    {item}
                  </label>
                </div>
              ))}

            </div>

            {index !== filterData.length - 1 && (
              <hr className="mt-3 sm:mt-5 border-gray-200" />
            )}

          </div>
        ))}

      </RadioGroup>
    </div>
  );
};

export default FilterCard;