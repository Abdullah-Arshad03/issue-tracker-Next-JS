'use client'

import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface Props {
    children : ReactNode
}

const AuthProvider = ( {children} : Props  ) =>  <SessionProvider>{children}</SessionProvider>

export default AuthProvider