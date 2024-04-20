'use client'
import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState, useCallback } from 'react';
import { useForm , Controller } from 'react-hook-form';
import axios from 'axios';
import Router, { useRouter } from 'next/navigation';
import { Callout } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod'
import {createIssueSchema} from '../../validationSchemas'

// if we add new key in the following interface, so we have to update this in the zod schema to, so in order to save myself from this hurdle, i have to use the infer property from the z i-e zod object 
interface IssuesForm {
  title : string , 
  description : string 
}

const NewIssuePage = () => {

  const router = useRouter()
  const [error, setError] = useState('')

const {register , control , handleSubmit } = useForm<IssuesForm>({resolver : zodResolver(createIssueSchema)})
  return (<>
  {error && <Callout.Root className='max-w-xl mb-4' color='red' >
    <Callout.Text>{error}</Callout.Text>
    </Callout.Root>
  }
  <form className='max-w-xl space-y-3' onSubmit={handleSubmit( async(data)=> {

  try {
    const res =  await axios.post('http://localhost:3000/api/issues/', data)
    console.log('this is the response ', res)
    router.push('/issues')
  } catch (error) {
     setError('An Unexpected Error Occured !')
  }


  })}>
    <TextField.Root placeholder='Enter the Issue' {...register('title')} ></TextField.Root>

    {/* we cannot use directly form hook on the SimpleMdeReact so we use Controller component from the react hook form */}
<Controller
name='description'
control = {control}
render={({field})=> <SimpleMdeReact {...field}/>
}

/>
    <Button>Submit New Issue</Button>
    </form>
    </>

  )
}
 
export default NewIssuePage