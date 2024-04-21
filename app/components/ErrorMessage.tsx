import React  , {ReactNode}from 'react'
import { Text } from '@radix-ui/themes'


// Instead of this interface we can use the propWithChildren from the react, so with that we dont have, to use define the interface explicitly.

interface Props {
    children : ReactNode
}

const ErrorMessage = ( {children}: Props) => {

    if (!children){
        return null
    }
  return (
    
        <Text color="red" as="p">
           {children}
          </Text>
  )
}

export default ErrorMessage
