import React from 'react'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'
import delay from 'delay'

const IssueForm = dynamic(
  ()=> import('@/app/issues/_components/IssueForm') ,
  {ssr : false ,
    loading : () => <IssueFormSkeleton/>

  }
)

const NewIssuePage = () => {

  delay(2000)
  return (
    <>
<IssueForm issue={null}/>
    </>
  )
}

export default NewIssuePage