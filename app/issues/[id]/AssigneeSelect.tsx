"use client";

import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/app/components/Loader";
import { undefined } from "zod";
import {toast , Toaster} from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"], // uniquily identifying the data in cache
    queryFn: () =>
      axios
        .get("http://localhost:3000/api/users")
        .then((res) => res.data.users),
    staleTime: 60 * 1000,
    retry: 3,
    // react query uses fetch function to fetch the data and store it in its cache here we can use any library like axios or anything, currently we are using the axios
  });
  console.log("these are the users", data);
  if (error) {
    return null;
  }

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <>
    <Toaster/>
      <Select.Root
      defaultValue={issue.assignedToUserId || "null"}
        onValueChange={async (userId) => {
          try {
            if (userId !== "null") {
              const res = await axios.put(`http://localhost:3000/api/issues/` + issue.id, {
                assignedToUserId: userId,
              });
           toast.success('user assigned')
            }else{
            const res = await axios.put(
              `http://localhost:3000/api/issues/` + issue.id,
              { assignedToUserId: null }
            );
           toast.success('user Unassigned')

          }
          } catch (error) {
            toast.error('user aint assinged')
          }
        }}
      >
        <Select.Trigger placeholder="Assign..."></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {data?.map((user) => (
              <>
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              </>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
