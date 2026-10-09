'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export interface SortableStepItem {
  id: string;
  label: string;
  imageSrc?: string;
  icon?: React.ReactNode;
}

export interface SortableListProps {
  items: SortableStepItem[];
  onItemsChange: (newItems: SortableStepItem[]) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

interface SortableItemProps {
  item: SortableStepItem;
  index: number;
}

function SortableItem({ item, index }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative rounded-2xl sm:rounded-3xl bg-white border-2 transition-all duration-200 select-none cursor-grab active:cursor-grabbing touch-none ${
        isDragging
          ? 'opacity-30 border-dashed border-[#4F7DF3] bg-blue-50/50 shadow-inner'
          : 'border-slate-200/80 hover:border-[#4F7DF3]/60 hover:shadow-md sm:hover:-translate-y-1'
      }`}
    >
      {/* Mobile Row Layout (< 640px) */}
      <div className="flex sm:hidden items-center justify-between p-3 gap-3 min-h-[64px] w-full">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="w-8 h-8 rounded-full bg-[#3B82F6] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
            {index + 1}
          </span>
          {item.imageSrc ? (
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <Image
                src={item.imageSrc}
                alt={item.label}
                width={48}
                height={48}
                className="max-h-12 w-auto object-contain pointer-events-none"
              />
            </div>
          ) : item.icon ? (
            <span className="text-2xl shrink-0">{item.icon}</span>
          ) : null}
          <span className="text-sm font-extrabold text-[#17233C] truncate">
            {item.label}
          </span>
        </div>
        <div className="p-1 text-slate-400 group-hover:text-[#4F7DF3] shrink-0 pointer-events-none">
          <GripVertical className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>

      {/* Desktop Large Vertical Card Layout (>= 640px) */}
      <div className="hidden sm:flex flex-col items-center justify-between p-5 h-full min-h-[280px] w-full">
        <span className="w-10 h-10 rounded-full bg-[#3B82F6] text-white font-black text-base flex items-center justify-center shadow-xs self-start shrink-0">
          {index + 1}
        </span>

        <div className="w-full flex-1 flex items-center justify-center my-3 p-1 relative min-h-[150px]">
          {item.imageSrc ? (
            <Image
              src={item.imageSrc}
              alt={item.label}
              width={180}
              height={180}
              className="object-contain max-h-40 w-auto pointer-events-none drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
            />
          ) : item.icon ? (
            <span className="text-6xl">{item.icon}</span>
          ) : null}
        </div>

        <span className="text-base font-black text-[#17233C] text-center leading-snug px-1 w-full">
          {item.label}
        </span>
      </div>
    </div>
  );
}

// Rendered inside DragOverlay for smooth dragging feedback
function DragOverlayItem({ item, index }: SortableItemProps) {
  return (
    <div className="w-full max-w-sm sm:w-56 rounded-2xl sm:rounded-3xl bg-white border-2 border-[#4F7DF3] shadow-2xl ring-4 ring-[#4F7DF3]/20 select-none cursor-grabbing">
      {/* Mobile Drag Overlay */}
      <div className="flex sm:hidden items-center justify-between p-3 gap-3 min-h-[64px] w-full">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="w-8 h-8 rounded-full bg-[#4F7DF3] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
            {index + 1}
          </span>
          {item.imageSrc ? (
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <Image
                src={item.imageSrc}
                alt={item.label}
                width={48}
                height={48}
                className="max-h-12 w-auto object-contain pointer-events-none"
              />
            </div>
          ) : (
            <span className="text-2xl shrink-0">{item.icon}</span>
          )}
          <span className="text-sm font-black text-[#17233C] truncate">
            {item.label}
          </span>
        </div>
        <div className="p-1 text-[#4F7DF3] shrink-0">
          <GripVertical className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>

      {/* Desktop Drag Overlay */}
      <div className="hidden sm:flex flex-col items-center justify-between p-5 h-full min-h-[280px] w-full">
        <span className="w-10 h-10 rounded-full bg-[#4F7DF3] text-white font-black text-base flex items-center justify-center shadow-md self-start shrink-0">
          {index + 1}
        </span>

        <div className="w-full flex-1 flex items-center justify-center my-3 p-1 relative min-h-[150px]">
          {item.imageSrc ? (
            <Image
              src={item.imageSrc}
              alt={item.label}
              width={180}
              height={180}
              className="object-contain max-h-40 w-auto pointer-events-none drop-shadow-md"
            />
          ) : (
            <span className="text-6xl">{item.icon}</span>
          )}
        </div>

        <span className="text-base font-black text-[#17233C] text-center leading-snug px-1 w-full">
          {item.label}
        </span>
      </div>
    </div>
  );
}

export default function SortableList({
  items,
  onItemsChange,
  title,
  subtitle,
  className = '',
}: SortableListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch for dnd-kit SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onItemsChange(arrayMove(items, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeIndex = activeId ? items.findIndex((item) => item.id === activeId) : -1;
  const activeItem = activeIndex !== -1 ? items[activeIndex] : null;

  if (!isMounted) {
    return (
      <div className={`w-full max-w-6xl mx-auto space-y-4 ${className}`}>
        {title && (
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#17233C] tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm font-semibold text-[#718096] mt-1">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-5 sm:gap-5 items-stretch w-full">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl sm:rounded-3xl p-3 sm:p-5 bg-white border-2 border-slate-200/80 flex items-center sm:flex-col sm:justify-between min-h-[64px] sm:min-h-[280px]"
            >
              <div className="flex items-center gap-3 sm:hidden">
                <span className="w-8 h-8 rounded-full bg-[#3B82F6] text-white font-black text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                {item.imageSrc && (
                  <Image
                    src={item.imageSrc}
                    alt={item.label}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                )}
                <span className="text-sm font-extrabold text-[#17233C]">
                  {item.label}
                </span>
              </div>

              <div className="hidden sm:flex flex-col items-center justify-between h-full w-full">
                <span className="w-10 h-10 rounded-full bg-[#3B82F6] text-white font-black text-base flex items-center justify-center self-start shrink-0">
                  {index + 1}
                </span>
                <div className="w-full flex-1 flex items-center justify-center my-3 p-1 relative min-h-[150px]">
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.label}
                      width={180}
                      height={180}
                      className="object-contain max-h-40 w-auto"
                    />
                  ) : (
                    <span className="text-5xl">{item.icon}</span>
                  )}
                </div>
                <span className="text-base font-black text-[#17233C] text-center leading-snug w-full">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-6xl mx-auto space-y-4 ${className}`}>
      {title && (
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-[#17233C] tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm font-semibold text-[#718096] mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-5 sm:gap-5 items-stretch w-full">
            {items.map((item, index) => (
              <SortableItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeItem ? (
            <DragOverlayItem item={activeItem} index={activeIndex} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
