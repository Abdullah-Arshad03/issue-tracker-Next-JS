'use client'
import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState, useCallback } from 'react';

const NewIssuePage = () => {
  const [value, setValue] = useState("");
  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);
  return (<>
  <div className='max-w-xl space-y-3'>
    <TextField.Root placeholder='Enter the Issue'></TextField.Root>
    <SimpleMdeReact value={value} onChange={onChange} />
    <Button>Submit New Issue</Button>
    </div>

    
    </>

  )
}
 
export default NewIssuePage