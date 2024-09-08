import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findFirst({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the attachment exists for the given course
    const attachment = await db.attachment.findFirst({
      where: {
        id: params.attachmentId,
        courseId: params.courseId,
      },
    });

    if (!attachment) {
      return new NextResponse("Attachment not found", { status: 404 });
    }

    // Now delete the attachment by id
    await db.attachment.delete({
      where: {
        id: params.attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[COURSES_ID_ATTACH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
