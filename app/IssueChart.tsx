'use client'

import React from 'react'
import { Card } from '@radix-ui/themes'
import {ResponsiveContainer , BarChart ,XAxis ,YAxis , Bar} from 'recharts'
// import { Value } from '@radix-ui/themes/src/components/data-list.jsx'

interface Props{
    open : number,
    inProgress : number,
    closed: number
}

const IssueChart = ({open , inProgress, closed} : Props) => {
    const data = [
        {label : 'Open' , value : open},
        {label : 'In Progress' , value : inProgress},
        {label : 'Closed' , value : closed},

    ]
  return (
   <Card>
    <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
            <XAxis dataKey='label'>

            </XAxis>
            <YAxis></YAxis>
            <Bar dataKey='value' barSize={60} fill='#6e56cf'></Bar>

        </BarChart>

    </ResponsiveContainer>
   </Card>
  )
}

export default IssueChart