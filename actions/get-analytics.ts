import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupedByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: { total: number; count: number } } =
    {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = { total: 0, count: 0 };
    }
    // Ensure price is a number and not null or undefined
    const price = purchase.course.price ?? 0;
    grouped[courseTitle].total += price;
    grouped[courseTitle].count += 1;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    // Find all courses created by the user
    const userCourses = await db.course.findMany({
      where: { userId },
      select: { id: true },
    });

    const userCourseIds = userCourses.map((course) => course.id);

    // Find all purchases made by the user and filter by the courses they created
    const purchases = await db.purchase.findMany({
      where: {
        userId,
        courseId: { in: userCourseIds },
      },
      include: { course: true },
    });

    const grouped = groupedByCourse(purchases);

    const data = Object.entries(grouped).map(
      ([courseTitle, { total, count }]) => ({
        name: courseTitle,
        total: total,
        sales: count, // Count of purchases for each course
      })
    );

    const totalRevenue = data.reduce((acc, { total }) => acc + total, 0);
    const totalSales = data.reduce((acc, { sales }) => acc + sales, 0);

    return { data, totalRevenue, totalSales };
  } catch (error) {
    console.log("[GET-ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
