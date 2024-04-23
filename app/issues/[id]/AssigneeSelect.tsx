'use client'

import React from 'react'
import { Select } from '@radix-ui/themes'

const AssigneeSelect = () => {
  return (
 <>
 <Select.Root>
    <Select.Trigger placeholder='Assign...'>

    </Select.Trigger>
    <Select.Content>
        <Select.Group>
            <Select.Label>
                Suggestions
            </Select.Label>
            <Select.Item value='1'>
         Abdullah Bin Arshad
            </Select.Item>
        </Select.Group>
    </Select.Content>
 </Select.Root>
 </>
  )
}

export default AssigneeSelect