import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { Value } from "@radix-ui/themes/src/components/data-list.jsx";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import StyledLink from "../components/StyledLink";
import { Status } from "@prisma/client";

interface Props {
  searchParams :{
    status : Status 
  }
}
const IssuesPage = async ({searchParams : {status}} : Props) => {


  const statuses = Object.values(status)
  const checkStatus = statuses.includes(status) ? status : undefined
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
          {issues.map((issue) => (
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
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

// export const dynamic = 'force-dynamic'
// export const revalidate = 0

export default IssuesPage;
