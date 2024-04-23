import React from "react";
import { Button, AlertDialog, Flex } from "@radix-ui/themes";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
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
        <Button  variant='soft' color="red">Delete Issue</Button>

        </AlertDialog.Action>
        </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
