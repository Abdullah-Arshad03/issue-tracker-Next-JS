'use server'

import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"



const deleteIssueHandler: any = async (request: NextRequest , issueId:any ) =>{
  console.log(issueId)
    const issue = await prisma.issue.findUnique({
      where : { 
          id : Number(issueId)
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

  console.log(' this is the deleted issue from server action ' , deletedIssue)

  return NextResponse.json({message : "issue is deleted using the server action" ,
      deletedIssue: deletedIssue
  } , {status : 200})

    


  }

  export default deleteIssueHandler