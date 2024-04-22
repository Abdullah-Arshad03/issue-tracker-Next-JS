import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueDetails from "./EditIssueDetails";
import IssueDetails from "./IssueDetails";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box className="max-w-xl">
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <EditIssueDetails issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssuesDetailPage;
