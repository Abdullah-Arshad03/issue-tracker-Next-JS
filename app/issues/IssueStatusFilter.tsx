'use client'

import React from 'react'
import { Select } from '@radix-ui/themes'
import { Status } from '@prisma/client'
import {useRouter} from 'next/navigation'


const statuses: {label: string , value?: Status}[] = [
  {label : 'All' } ,
  {label : 'Open' , value : 'OPEN'},
  {label : 'In Progress' , value : 'IN_PROGRESS'},
  {label : 'Closed' , value:'CLOSED'}

]
const IssueStatusFilter = () => {

  const router = useRouter()


  return (
    <>
    <Select.Root onValueChange={((status)=>{
        const query = status === 'all' ?  '' : `?status=${status}`
        router.push('/issues'+query)

    })}>
        <Select.Trigger placeholder='Filter by status...'></Select.Trigger>
        <Select.Content>
           {statuses.map((status)=> (
            <>
            <Select.Item key={status.value} value={status.value || 'all'}>{status.label}</Select.Item>
            </>
           ))}
        </Select.Content>
    </Select.Root>
    </>
  )
}

export default IssueStatusFilter