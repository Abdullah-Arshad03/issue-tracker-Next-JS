import prisma from "@/prisma/client";
import { Box, Grid , Flex , AlertDialog } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueDetails from "./EditIssueDetails";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
  params: { id: string };
}
const IssuesDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) {
    notFound();
  }

  console.log("this is the issue ", issue);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className=" md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      <Flex direction='column' gap='4'>
        <EditIssueDetails issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
      </Flex>
    </Grid>
  );
};

export default IssuesDetailPage;
