import React from 'react'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'
import IssueChart from './IssueChart'
import { Grid ,Flex } from '@radix-ui/themes'

const Home = async() => {
 const open =  await  prisma.issue.count({where: {status : 'OPEN'}})
 const inProgress =  await  prisma.issue.count({where: {status : 'IN_PROGRESS'}})
 const closed =  await  prisma.issue.count({where: {status : 'CLOSED'}})


  return (<>
   {/* <LatestIssues/>  */}
   {/* <IssueChart open={open} inProgress={inProgress} closed={closed   }></IssueChart> */}

  <Grid columns={{initial : '1'  , md : '2'}} gap='5'>
    <Flex direction='column' gap='5'>
      <IssueSummary open={open} inProgress={inProgress} closed={closed   }/>
      <IssueChart open={open} inProgress={inProgress} closed={closed   }/>

    </Flex>
  <LatestIssues>

  </LatestIssues>

  </Grid>
 
    </>
  )
} 

export default Home