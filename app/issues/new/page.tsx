"use client";
import { Button, TextField, Text } from "@radix-ui/themes";
import React from "react";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Router, { useRouter } from "next/navigation";
import { Callout } from "@radix-ui/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "../../validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Loader from "@/app/components/Loader";

// if we add new key in the following interface, so we have to update this in the zod schema to, so in order to save myself from this hurdle, i have to use the infer property from the z i-e zod object

type IssuesForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting , setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssuesForm>({ resolver: zodResolver(createIssueSchema) });
  

const onSubmitHandler = handleSubmit(async (data) => {
  try {
    setIsSubmitting(true)
    const res = await axios.post(
      "http://localhost:3000/api/issues/",
      data
    );
    console.log("this is the response ", res);
    router.push("/issues");

  } catch (error) {
    setIsSubmitting(false)

    console.log(errors);
    setError("An Unexpected Error Occured !");
  }
  console.log(errors.description);
})



  return (
    <>
      {error && (
        <Callout.Root className="max-w-xl mb-4" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={onSubmitHandler}
      >
        <TextField.Root
          placeholder="Enter the Issue"
          {...register("title")}
        ></TextField.Root>
       
         <ErrorMessage>
          {errors.title?.message}
         </ErrorMessage>
       
        {/* we cannot use directly form hook on the SimpleMdeReact so we use Controller component from the react hook form */}

        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMdeReact {...field} />}
        />
       
          <Text color="red" as="p">
            {errors.description?.message}
          </Text>
       

        <Button disabled = {isSubmitting}>Submit New Issue { isSubmitting &&  <Loader></Loader>}</Button>
      </form>
    </>
  );
};

export default NewIssuePage;
