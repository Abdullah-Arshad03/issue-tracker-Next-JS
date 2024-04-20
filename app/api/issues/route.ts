import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request:NextRequest){

    const body = await request.json()

    // validate the request.
    const validation = createIssueSchema.safeParse(body)
    
    if(!validation.success){
        return NextResponse.json({
            error : validation.error.errors
        } , {status : 400}) // 400 means Bad Request.
    }

    // if request is valide we will store this issue in the database.

    const newIssue = await prisma.issue.create({
        data : {
            title : body.title,
            description : body.description
        }
    })

  return  NextResponse.json({
    message : 'new Issue is created!',
    issue : newIssue,
    }, {status : 201}) // status 201 which mean that source is created.

}


