import prisma from "@/prisma/client";
import { Box, Grid , Flex , AlertDialog } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueDetails from "./EditIssueDetails";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/auth/AuthOptions";
import AssigneeSelect from "./AssigneeSelect";

import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number)=>  prisma.issue.findUnique({where : {id : issueId}})
)


const IssuesDetailPage = async ({ params: { id } }: Props) => {
 const session = await getServerSession(AuthOptions)
  const issue = await fetchIssue(Number(id))

  if (!issue) {
    notFound();
  }

  console.log("this is the issue ", issue);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className=" md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

{ session &&
      <Flex direction='column' gap='4'>
        <AssigneeSelect issue = {issue}/>
        <EditIssueDetails issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
      </Flex>
}
    </Grid>
  );
};

// here we have to generate the dynamic meta data based on the issue
// we are using prisma for two times for generating all the data here.

export async function generateMetadata ({params : {id}} : Props){ 
 const issue = await fetchIssue(Number(id))


 return{
  title : issue?.title ,
  description : 'Details of Issue' + issue?.id
 }
} 

export default IssuesDetailPage;
