import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

// Check if environment variables are set
if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
  throw new Error(
    "MUX_TOKEN_ID and MUX_TOKEN_SECRET must be set in the environment variables"
  );
}

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

const { video: Video } = mux;

// Create course
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId } = params;
    const values = await req.json();

    const course = await db.course.update({
      where: { id: courseId, userId: userId },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Delete course
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assestId) {
        await Video.assets.delete(chapter.muxData.assestId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });
    
    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSES_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
