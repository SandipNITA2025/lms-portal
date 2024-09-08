"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Checkbox } from "@/components/ui/checkbox";

interface AccessFromProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const AccessFrom = ({ initialData, courseId, chapterId }: AccessFromProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter access
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-3 w-3 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.isFree && "text-slate-700 dark:text-slate-400 italic"
          )}
        >
          {!initialData.isFree
            ? "This chapter is not free"
            : "This chapter is free"}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if you want to make this chapter free
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2 mt-2">
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AccessFrom;
