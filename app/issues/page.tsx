import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import StyledLink from "../components/StyledLink";
import IssueActions from "./IssueActions";
import { Metadata } from "next";

interface Props {
  searchParams :{
    status : Status 
  }
}
const IssuesPage = async ({searchParams : {status}} : Props) => {


 const statuses = ["OPEN" , "IN_PROGRESS" , "CLOSED"]
 const checkStatus = statuses.includes(status) ? status : undefined
 console.log('this is the checkStatus ' , checkStatus)

 const issues = await prisma.issue.findMany({
   where : {
     status  : checkStatus
   }
 });

  return (
    <>
      <IssueActions/>
      {/* if we set variant to surface we get nice look of the table */}
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {   issues.map((issue) => (
            <>
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <StyledLink href={`/issues/${issue.id}`}>
                  {issue.title}
                  </StyledLink>
                  <div className="block md:hidden"><IssueStatusBadge status={issue.status}/></div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                 {issue.createdAt ? issue.createdAt.toDateString() : ''}
                </Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = 'force-dynamic'

export const metadata:Metadata = {
  title : 'Issue Tracker - Issue List' , 
  description : 'View all project issues'
}

export default IssuesPage;
 