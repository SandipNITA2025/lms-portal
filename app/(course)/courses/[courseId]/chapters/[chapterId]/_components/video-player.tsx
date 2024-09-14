"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

interface VideoPlayerProps {
  courseId: string;
  chapterId: string;
  playbackId?: string;
  title: string;
  nextChapter?: string;
  isLocked: boolean;
  completeOnEnd?: boolean;
}

const VideoPlayer = ({
  courseId,
  chapterId,
  playbackId,
  nextChapter,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {

  const confetti = useConfettiStore();
  const router = useRouter();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapter) {
          confetti.onOpen();
          toast.success("Course completed");
          router.refresh();
        } else {
          router.push(`/courses/${courseId}/chapters/${nextChapter}`);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video w-full h-full">
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-700 text-slate-300">
          <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-700 flex-col gap-y-2">
          <Lock className="h-8 w-8 text-slate-300" />
          <p className="text-sm text-slate-300">This video is locked.</p>
        </div>
      )}

      {!isLocked && playbackId && (
        <CldVideoPlayer
          src={playbackId}
          sourceTypes={["hls", "dash"]}
          transformation={{ streaming_profile: "full_hd" }}
          autoPlay
        />
      )}
    </div>
  );
};

export default VideoPlayer;
