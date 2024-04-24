import React from 'react'
import { Flex , Card , Text} from '@radix-ui/themes'
import { Status } from '@prisma/client'
import Link from 'next/link'


interface Props{
    open : number,
    inProgress : number,
    closed: number
}
const IssueSummary = ({open , inProgress , closed} : Props) => {

    // we pass values in this array using the props
const statuses : {
    label : String ,
    value : number ,
    status : Status
}[] = [
    {
        label : 'Open Issues',
        value : open ,
        status: "OPEN"
    },
    {
        label : 'In-progress',
        value : inProgress ,
        status: "IN_PROGRESS"
    }, {
        label : 'Closed Issues',
        value : closed,
        status: "CLOSED"
    }
]

  return (
  <>
  <Flex gap='4'>
   {statuses.map((statuss)=>(<>
   <Card key={statuss.status}>
    <Flex direction='column' gap='2'>
        <Link className='text-sm font-medium' href={`/issues?status=${statuss.status}`}>{statuss.label}</Link>
        <Text size='5' className='font-bold'>{statuss.value}</Text>

    </Flex>
   </Card>
   </>))}
  </Flex>
  </>
  )
}

export default IssueSummary