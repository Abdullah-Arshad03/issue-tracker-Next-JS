import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import { Heading ,Text , Flex  , Card} from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
import delay from 'delay'

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
   await delay(5000)
    console.log('this is the issue ', issue)
  return (
    <div className='max-w-xl'>
      <Heading>{issue?.title}</Heading>
      <Flex className='space-x-3' my='2'>
     <IssueStatusBadge status={issue.status}/>
      <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
     <Card mt='4'>
        <ReactMarkdown className='prose'>{issue?.description}</ReactMarkdown></Card> 
    </div>
  )
}

export default IssuesDetailPage