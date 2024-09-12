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

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
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

    // Find and delete the chapter
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    // Delete associated video assets if they exist
    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: { chapterId: params.chapterId },
      });

      if (existingMuxData) {
        // Check if this Mux asset is only used by this chapter
        const assetUsage = await db.muxData.count({
          where: { assestId: existingMuxData.assestId },
        });

        if (assetUsage === 1) {
          // Delete the Mux asset if no other chapter is using it
          await Video.assets.delete(existingMuxData.assestId);
        }

        // Delete the Mux data record from the database
        await db.muxData.delete({ where: { id: existingMuxData.id } });
      }
    }

    // Delete the chapter from the database
    await db.chapter.delete({
      where: {
        id: params.chapterId,
      },
    });

    // Unpublish the course if no other chapters are published
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!publishedChapters.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return new NextResponse("Chapter deleted successfully", { status: 200 });
  } catch (error) {
    console.error("[COURSES_ID_CHAPTER_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

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

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    // Check if new video URL is provided
    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      // If chapter already has a video, delete the old video and replace with the new one
      if (existingMuxData) {
        // Ensure that this asset is only used by this chapter before deleting
        const assetUsage = await db.muxData.count({
          where: { assestId: existingMuxData.assestId },
        });

        if (assetUsage === 1) {
          // If the asset is only used by this chapter, delete it from Mux
          await Video.assets.delete(existingMuxData.assestId);
        }

        // Delete the Mux data from the database
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      // Create a new asset on Mux with the new video URL
      const asset = await Video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      // Ensure playbackId exists before proceeding
      const playbackId = asset.playback_ids?.[0]?.id;

      if (playbackId) {
        // Store the new Mux asset information in the database
        await db.muxData.create({
          data: {
            assestId: asset.id,
            chapterId: params.chapterId,
            playbackId: playbackId,
          },
        });
      } else {
        console.error("Failed to create playback ID for the asset");
        return new NextResponse("Failed to process video upload", {
          status: 500,
        });
      }
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[COURSES_ID_CHAPTER_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
