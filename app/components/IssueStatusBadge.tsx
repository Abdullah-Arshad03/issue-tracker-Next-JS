import React from 'react'
import { Status } from '@prisma/client' 
import { Badge } from '@radix-ui/themes'


interface Props {
    status : string
}

// interface statusObject {
//     label : string,
//     color : string
// }

// this is the another way using the Record type in the TypeScript to map the status badge according to the incoming value, but i want to make thing pretty much simple and straight forward , so i used conditional approach

// const statusMap: Record<Status , statusObject> = {
//     OPEN : {label : 'Open' , color: 'red'},
//     IN_PROGRESS :  {label : 'In Progress' , color: 'violet'},
//     CLOSED :  {label : 'Closed' , color: 'green'},

// }

// retrieval will be like statusMap[status].label : the status in bracket coming as a prop.


const IssueStatusBadge = ( {status} : Props) => {
  return (
     <>
     {status === 'OPEN' && <Badge color='red'>Open</Badge>}
     {status === 'IN_PROGRESS' && <Badge color='violet'>In Progress</Badge>}
     {status === 'CLOSED' && <Badge color='green'>Close</Badge>}

     </>
  )
}

export default IssueStatusBadge
