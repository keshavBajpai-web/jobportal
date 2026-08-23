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

  const [selectedValue , setSelectedValue] = useState("")

  const changeHandler = (value) => {
    setSelectedValue(value)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])
  

  return (
    <div className="w-full rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <RadioGroup
      value={selectedValue}
      onValueChange={changeHandler}
      className="space-y-2">
        {filterData.map((section, index) => (
          <div key={index}>
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              {section.filterType}
            </h3>

            <div className="space-y-1">
              {section.array.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-gray-100 transition"
                >
                  <RadioGroupItem value={item} id={`${section.filterType}-${i}`} />
                  <label
                    htmlFor={`${section.filterType}-${i}`}
                    className="cursor-pointer text-sm text-gray-700"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>

            {index !== filterData.length - 1 && (
              <hr className="mt-5 border-gray-200" />
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;