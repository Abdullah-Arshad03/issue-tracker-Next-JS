import React, { ReactNode } from 'react'
import Link from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'



interface Props {
    href : string ,
    children : ReactNode
}
const StyledLink = ({href , children} : Props) => {
  return ( 
<>
<Link href={href} passHref legacyBehavior>
    <RadixLink>
        {children}
    </RadixLink>
</Link>
</>
  )
}

export default StyledLink