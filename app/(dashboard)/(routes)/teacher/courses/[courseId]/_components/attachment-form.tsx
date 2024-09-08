"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { cn } from "@/lib/utils";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1, "File URL is required"),
});

const AttachmentForm: React.FC<AttachmentFormProps> = ({
  initialData,
  courseId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const router = useRouter();

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Attachment added successfully");
      handleToggleEdit();
      router.refresh();
    } catch {
      toast.error("Failed to add attachment");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete attachment");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button onClick={handleToggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-3 w-3 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => url && handleSubmit({ url })}
          />
          <p className="text-xs text-muted-foreground mt-4">
            Add any attachment that might be needed to complete the course.
          </p>
        </div>
      ) : (
        <>
          {initialData.attachments.length === 0 ? (
            <p className="text-sm mt-2 text-slate-700 dark:text-slate-400 italic">
              No attachments yet
            </p>
          ) : (
            <div className="space-y-2 mt-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 dark:bg-sky-800 border-sky-200 text-sky-700 dark:text-sky-200 rounded-md"
                >
                  <File className="h-4 w-4 mr-2" />
                  <p className="line-clamp-1 text-sm">{attachment.name}</p>
                  {deletingId === attachment.id ? (
                    <Loader2 className="h-4 w-4 animate-spin ml-auto" />
                  ) : (
                    <button
                      onClick={() => handleDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AttachmentForm;
