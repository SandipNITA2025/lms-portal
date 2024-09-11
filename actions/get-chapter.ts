import { db } from "@/lib/db";
import { Attachment, Chapter, Course } from "@prisma/client";

interface GetChaptersParams {
  userId: string;
  courseId: string;
  chapterId?: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChaptersParams) => {
  if (!chapterId || !userId) {
    console.log("[GET-CHAPTERS] Missing chapterId or userId");
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }

  try {
    const purchase = await db.purchase.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    const course = await db.course.findFirst({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findFirst({
      where: {
        isPublished: true,
        id: chapterId,
      },
    });

    if (!chapter || !course) {
      console.log("[GET-CHAPTERS] Chapter or course not found");
      return {
        chapter: null,
        course: null,
        muxData: null,
        attachments: [],
        nextChapter: null,
        userProgress: null,
        purchase: null,
      };
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        chapterId_userId: {
          chapterId,
          userId,
        },
      },
    });

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("[GET-CHAPTERS]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
