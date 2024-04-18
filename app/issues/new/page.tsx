'use client'
import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState, useCallback } from 'react';
import { useForm , Controller } from 'react-hook-form';
import axios from 'axios';

interface IssuesForm {
  title : string , 
  description : string 
}

const NewIssuePage = () => {

  // const [value, setValue] = useState("");
  // const onChange = useCallback((value: string) => {
  //   setValue(value);
  // }, []);


const {register , control , handleSubmit } =    useForm<IssuesForm>()


  return (<>
  <form className='max-w-xl space-y-3' onSubmit={handleSubmit((data)=> {
    axios.post('http://localhost:3000/api/users', data).then((result)=>{console.log('form submitted : ', result )}).catch((error)=>{console.log(error)})
  })}>
    <TextField.Root placeholder='Enter the Issue' {...register('title')} ></TextField.Root>

    {/* we cannot use directly form hook on the SimpleMdeReact so we use Controller component from the react hook form */}
<Controller
name='descriptionn'
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