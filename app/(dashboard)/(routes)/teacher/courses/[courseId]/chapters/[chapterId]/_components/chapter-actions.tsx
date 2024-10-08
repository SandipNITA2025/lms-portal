"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success("Chapter unpublished successfully");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success("Chapter published successfully");
      }
      router.refresh();
    } catch (error: any) {
      console.error("Error publishing/unpublishing chapter:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted successfully");
      router.push(`/teacher/courses/${courseId}`);
    } catch (error: any) {
      console.error("Error deleting chapter:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        onClick={onClick}
        variant={"outline"}
        size={"sm"}
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : isPublished ? (
          "Unpublish"
        ) : (
          "Publish"
        )}
      </Button>

      <ConfirmModal onConfirm={onDelete}>
        {/* Change the trigger to a div or span instead of Button */}
        <div className="flex items-center justify-center">
          <Button
            asChild
            disabled={disabled || isLoading}
            size="sm"
            variant="outline"
          >
            <span>
              {isLoading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
            </span>
          </Button>
        </div>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
