import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allApliedJobs} = useSelector(store=>store.job)
    // console.log(allApliedJobs);
    
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your applied job
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allApliedJobs.length <=0 ? <span>you haven't applied any job yet.</span>:allApliedJobs.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{item?.job?.title}</TableCell>
                                <TableCell>{item?.job?.company?.name}</TableCell>
                                <TableCell> <Badge>{item.status}</Badge> </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
