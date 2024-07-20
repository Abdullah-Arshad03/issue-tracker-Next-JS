'use client'

import React, { useState } from "react";
import { Button, AlertDialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";




const DeleteIssueButton = ({ issueId }: { issueId: number } ) => {
  const [error , setError]= useState(false)
  const [isDeleting , setIsDeleting] = useState(false)

  const router  = useRouter()

  const onDeleteIssue =  async()=>{
    try {
     setIsDeleting(true)
      const res = await axios.delete(`http://localhost:3000/api/issues/${issueId}`) 
      console.log('this is the response after deleting' , res)
      router.push('/issues')
      router.refresh()
      
    } catch (error) {
       setIsDeleting(false)
      setError(true)
    }
    }
  
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">Delete Issue {isDeleting && <Loader/>}</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
        <AlertDialog.Title> 
          Confirm Deletion
        </AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete ? the action cannot be undone
        </AlertDialog.Description>
        <Flex className="mt-4" gap='4'>
        <AlertDialog.Cancel>
          <Button  variant='soft' color="gray">Cancel</Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
        <Button  onClick={onDeleteIssue} variant='soft' color="red">Delete Issue</Button>

        </AlertDialog.Action>
        </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>
            Error
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-3">
            This Issue cannot be deleted!
          </AlertDialog.Description>
          <Button variant="soft" color="gray" onClick={()=> setError(false)} >Okay</Button>

        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
