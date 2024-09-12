import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import { Category, Course } from "@prisma/client";

// Define the type for the course with progress and category
export type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCoursesParams = {
  userId: string;
  title?: string;
  category?: string;
};

export const getCourses = async ({
  userId,
  title,
  category,
}: GetCoursesParams): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
        category: {
          name: {
            contains: category,
            mode: "insensitive",
          },
        },
        isPublished: true,
      },
      include: {
        category: true,

        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map through the courses and calculate progress
    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          const hasPurchases = course.purchases.length > 0;
          const progress = hasPurchases
            ? await getProgress(userId, course.id)
            : null;

          return {
            ...course,
            progress,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.error("[GET-COURSES]", error);
    return [];
  }
};
