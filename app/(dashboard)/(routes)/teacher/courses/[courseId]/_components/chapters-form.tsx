"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Grip, Loader2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Chapter, Course } from "@prisma/client";
import ChapterList from "./chapter-list";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const ChaptersForm: React.FC<ChaptersFormProps> = ({
  initialData,
  courseId,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleToggleCreating = () => setIsCreating((prev) => !prev);

  const handleCreateChapter = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created successfully");
      handleToggleCreating();
      router.refresh();
    } catch {
      toast.error("Failed to create chapter");
    }
  };

  const handleReorderChapters = async (
    updateData: { id: string; position: number }[]
  ) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapters reordered successfully");
      router.refresh();
    } catch {
      toast.error("Failed to reorder chapters");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOnEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute inset-0 bg-slate-500/20 dark:bg-slate-700/20 flex items-center justify-center rounded-md">
          <Loader2 className="animate-spin h-4 w-4" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button onClick={handleToggleCreating} variant="ghost">
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-3 w-3 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {isCreating ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateChapter)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g Introduction to Web 3.0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-2"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Create
            </Button>
          </form>
        </Form>
      ) : (
        <div
          className={cn(
            "mt-4 text-sm",
            !initialData.chapters.length && "text-slate-500 dark:text-slate-400 italic"
          )}
        >
          {initialData.chapters.length ? (
            <ChapterList
              onEdit={handleOnEdit}
              onReorder={handleReorderChapters}
              items={initialData.chapters}
            />
          ) : (
            "No chapters"
          )}
        </div>
      )}
      {!isCreating && initialData.chapters.length > 0 && (
        <p className="text-sm mt-4 text-muted-foreground">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChaptersForm;
