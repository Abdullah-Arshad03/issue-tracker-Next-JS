import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/app/validationSchemas";

interface Props {
    params : {
        id : string
    }
}
export async function PUT (request : NextRequest , {params : {id}} : Props){

    // get the issue by id
    // check if issue is there
    // if yes update after validating the updated content
    // if no throw the error

    const body= await request.json()

    const issue  = await prisma.issue.findUnique({
        where : {
            id : Number(id)
        }
    })
    console.log('this is the fetched Issue  : ', issue)

    if (!issue){
        return NextResponse.json({error : "The issue not found!"}, {status : 404})
    }

    const validation = createIssueSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json({error : validation.error.errors}, {status : 400})
    }

    const updatedIssue = await prisma.issue.update({
        where : {
            id : Number(issue.id)
        },
        data : {
            title : body.title,
            description : body.description
        }
    })
    console.log('issue is updated !' , updatedIssue)
  return NextResponse.json({
    message : 'Issue is updated!',
    updatedIssue : updatedIssue
  })
}

export async function DELETE ( request : NextRequest , {params : {id}} : Props){

   
 try {
    
    const issue = await prisma.issue.findUnique({
        where : { 
            id : Number(id)
        }
    })

    if( !issue ){
        return NextResponse.json({error : 'Issue Not found'} , { status : 404})
    }

  const deletedIssue = await   prisma.issue.delete({
        where : {
            id : issue.id
        }
    })

    console.log(' this is the delete issue ' , deletedIssue)

    return NextResponse.json({message : "issue is deleted" ,
        deletedIssue: deletedIssue
    } , {status : 200})

 } catch (error) {
    return NextResponse.json({
        message : 'error in the catch of the deleting func ' ,
        error : error
    })
    
 }
}