import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import { Heading ,Text , Flex  , Card} from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'


interface Props {
    params : {id : string}
}
const IssuesDetailPage = async({params : {id}} : Props) => {

   const issue = await prisma.issue.findUnique({
        where : { id : Number(id)}
    })

    if(!issue)
        {
            notFound()
        }

    console.log('this is the issue ', issue)
  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex className='space-x-3' my='2'>
     <IssueStatusBadge status={issue.status}/>
      <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
     <Card>{issue?.description}</Card> 
    </div>
  )
}

export default IssuesDetailPage