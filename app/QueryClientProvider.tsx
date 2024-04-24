'use client'

import React from 'react'
import {QueryClient , QueryClientProvider as ReactQueryClientProvider} from '@tanstack/react-query'
import { ReactNode } from 'react';

const queryClient = new QueryClient(); 


interface Props {
    children : ReactNode
}
const QueryClientProvider = ({children} : Props) => {
  return (
    <>
     <ReactQueryClientProvider client={queryClient}>
        {children}
     </ReactQueryClientProvider>
    </>
  )
}

export default QueryClientProvider