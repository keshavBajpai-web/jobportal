import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CompaniesTable = () => {

  const navigate = useNavigate()

  const { companies, searchCompanyByText } = useSelector(store => store.company)
  // console.log(companies);
  const [filterCompany, setFilterCompany] = useState(companies)
  // console.log(companies);


  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    });
    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText])



  return (
    <div className="w-full bg-white rounded-lg border">
      <Table>
        <TableCaption className="text-gray-500 py-4">
          A list of your recent registered companies
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Logo</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="text-right font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            filterCompany?.length <= 0 ? <span>you haven't registered any company yet</span> : (
              <>
                {
                  filterCompany?.map((company) => (


                    <TableRow key={company._id} className="hover:bg-gray-50">
                      <TableCell>
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage
                            src={company.logo}
                            alt="Company logo"
                          />
                        </Avatar>
                      </TableCell>

                      <TableCell className="font-medium">
                        {company.name}
                      </TableCell>

                      <TableCell className="text-gray-500">
                        {company.createdAt.split("T")[0]}
                      </TableCell>

                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger
                            type="button">
                            <MoreHorizontal className="h-5 w-5" />
                          </PopoverTrigger>

                          <PopoverContent className="w-32 p-2">
                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100">
                              <Edit2 className="h-4 w-4" />
                              <span className="text-sm">Edit</span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>

                  ))
                }
              </>
            )
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;

