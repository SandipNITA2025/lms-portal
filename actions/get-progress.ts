import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const chapterIds = publishedChapters.map((chapter) => chapter.id);

    const completedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: chapterIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (completedChapters / publishedChapters.length) * 100;
    console.log("[GET-PROGRESS]", progressPercentage);
    return progressPercentage;
    
  } catch (error) {
    console.log("[GET-PROGRESS]", error);
    return 0;
  }
};
