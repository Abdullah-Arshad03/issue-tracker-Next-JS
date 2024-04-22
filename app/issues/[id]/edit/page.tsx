import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { Issue } from '@prisma/client'
import prisma from '@/prisma/client'

interface Props {
   params : {
    id : string
   }
}

const EditIssuePage = async({params  : {id}} : Props) => {

   const issue = await prisma.issue.findUnique({
        where : { id : Number(id)}
    })

  return (
  <>
    <IssueForm issue = {issue} />
  </>
  )
}

export default EditIssuePage