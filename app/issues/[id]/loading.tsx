import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card  ,Text , Box} from '@radix-ui/themes'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import Skeleton from 'react-loading-skeleton' 
import 'react-loading-skeleton/dist/skeleton.css'


const LoadingIssueDetailsPage = () => {


  return (
    <Box className='max-w-xl'>
    <Heading className='mx-w-xl'><Skeleton/></Heading>
    <Flex className='space-x-3' my='2'>
  <Skeleton width='5rem'/>
    <Text><Skeleton width='8rem'/></Text>
    </Flex>
   <Card className='mt-4'>
    <Skeleton count={3}/>
    </Card>
  </Box>
  )
}

export default LoadingIssueDetailsPage