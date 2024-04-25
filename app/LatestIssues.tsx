import prisma from '@/prisma/client'
import React from 'react'
import { Table, Flex, Avatar , Card , Heading} from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusBadge from './components/IssueStatusBadge'

const LatestIssues = async() => {
  const issues = await  prisma.issue.findMany({
        orderBy  : {
            createdAt : 'desc'
        },
        take : 5,
        include : {
            assignedToUser : true
        } // taking top 5 records
        
    })
  return (
    <Card>
        <Heading size='4' mb='5' ml='3'>Latest Issues</Heading>
  <Table.Root>
   <Table.Body>
    {issues.map((issue)=>(<>
    <Table.Row key={issue.id}>
        <Table.Cell>
            <Flex justify='between'>
            <div className='flex flex-col' >
                <Link  href={`/issues/${issue.id}`}>
            {issue.title}</Link>
            <div className='max-w-sm'>
            <IssueStatusBadge  status={issue.status}/>
            </div>
            </div>
            {issue.assignedToUser && (<>
            <Avatar src={issue.assignedToUser.image!} fallback="?"
            size='2'
            radius='full'/>
            </>)}
            </Flex>
        </Table.Cell> 
    </Table.Row>
    </>))}
   </Table.Body>
  </Table.Root>
  </Card>
  )
}

export default LatestIssues