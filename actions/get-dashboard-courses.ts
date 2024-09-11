import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourse: CourseWithProgressWithCategory[];
  courseInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async ({
  userId,
}: {
  userId: string;
}): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: { userId },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = await Promise.all(
      purchasedCourses.map(async (purchase) => {
        const course = purchase.course as CourseWithProgressWithCategory;
        course.progress = await getProgress(userId, course.id);
        return course;
      })
    );

    const completedCourse = courses.filter((course) => course.progress === 100);
    const courseInProgress = courses.filter(
      (course) => course.progress && course.progress < 100
    );

    return { completedCourse, courseInProgress };
  } catch (error) {
    console.error("[GET-DASHBOARD-COURSES]", error);
    return { completedCourse: [], courseInProgress: [] };
  }
};
