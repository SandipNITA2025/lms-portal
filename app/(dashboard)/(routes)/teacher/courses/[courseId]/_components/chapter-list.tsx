"use client";

import React, { useEffect, useState } from "react";
import { Chapter } from "@prisma/client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChapterListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
}

const ChapterList: React.FC<ChapterListProps> = ({
  items,
  onEdit,
  onReorder,
}) => {
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Exit if no destination or position hasn't changed
    if (!destination || source.index === destination.index) return;

    const updatedChapters = Array.from(chapters);
    const [reorderedItem] = updatedChapters.splice(source.index, 1);
    updatedChapters.splice(destination.index, 0, reorderedItem);

    setChapters(updatedChapters);

    // Prepare bulk update data
    const bulkUpdateData = updatedChapters.map((chapter, index) => ({
      id: chapter.id,
      position: index,
    }));

    onReorder(bulkUpdateData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 dark:bg-slate-800 border-slate-200 text-slate-700 dark:text-slate-400 mb-4 text-sm rounded-md",
                      chapter.isPublished &&
                        "bg-sky-100 dark:bg-sky-800 border-sky-200 text-sky-700 dark:text-sky-200"
                    )}
                  >
                    <div
                      {...provided.dragHandleProps}
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 rounded-l-md transition",
                        chapter.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200 hover:dark:bg-slate-700"
                      )}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                   <span title={chapter.title}  className="line-clamp-1">{chapter.title}</span>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && (
                        <Badge className="text-slate-200 dark:text-slate-700">Free</Badge>
                      )}
                      <Badge
                        className={cn(
                          "bg-slate-500 dark:bg-slate-600",
                          chapter.isPublished && "bg-sky-700 dark:bg-sky-600"
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        className="h-4 w-4 cursor-pointer"
                        onClick={() => onEdit(chapter.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChapterList;
