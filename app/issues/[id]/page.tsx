import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import { Heading ,Text , Flex  , Card , Grid , Box , Button} from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
import {Pencil2Icon} from '@radix-ui/react-icons'
import Link from 'next/link'


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
    <Grid columns={{initial : '1' , md: '2'}} gap='5'>
      <Box className='max-w-xl'>
      <Heading>{issue?.title}</Heading>
      <Flex className='space-x-3' my='2'>
     <IssueStatusBadge status={issue.status}/>
      <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
     <Card mt='4'>
        <ReactMarkdown className='prose'>{issue?.description}</ReactMarkdown></Card> 
        </Box>

        <Box>
          
          <Button>
            <Pencil2Icon/>
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        </Box>
    </Grid>
  )
}

export default IssuesDetailPage