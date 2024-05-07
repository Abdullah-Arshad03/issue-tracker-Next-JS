import React from 'react'
// import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import dynamic from 'next/dynamic'
import EditPageSkeleton from './loading'

const IssueForm = dynamic(
    ()=> import ('@/app/issues/_components/IssueForm'),
    { ssr : false,
        loading : () => <EditPageSkeleton/>
     }
)
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