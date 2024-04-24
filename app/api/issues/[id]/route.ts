import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/app/validationSchemas";
import { AuthOptions } from "@/app/auth/AuthOptions";
import { getServerSession } from "next-auth";
import { patchIssueSchema } from "@/app/validationSchemas";
import { stat } from "fs";

interface Props {
  params: {
    id: string;
  };
}
export async function PUT(request: NextRequest, { params: { id } }: Props) {
//    
  const body = await request.json();

  const { title, description, assignedToUserId } = body;
  //validating the assigned issue id

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "invalid user" }, { status: 404 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id),
    },
  });
  console.log("this is the fetched Issue  : ", issue);

  if (!issue) {
    return NextResponse.json(
      { error: "The issue not found!" },
      { status: 404 }
    );
  }

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: Number(issue.id),
    },
    data: {
      title: title,
      description: description,
      assignedToUserId: assignedToUserId,
    },
  });
  console.log("issue is updated !", updatedIssue);
  return NextResponse.json({
    message: "Issue is updated!",
    updatedIssue: updatedIssue,
  });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(AuthOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 }); // 401 unauthorized
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue Not found" }, { status: 404 });
    }

    const deletedIssue = await prisma.issue.delete({
      where: {
        id: issue.id,
      },
    });

    console.log(" this is the delete issue ", deletedIssue);

    return NextResponse.json(
      { message: "issue is deleted", deletedIssue: deletedIssue },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "error in the catch of the deleting func ",
      error: error,
    });
  }
}
