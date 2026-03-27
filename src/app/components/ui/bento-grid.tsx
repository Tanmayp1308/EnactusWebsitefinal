"use client";

import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`grid md:grid-cols-3 gap-4 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: React.ReactNode; // ✅ upgraded
  description?: React.ReactNode; // ✅ FIXED
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={`row-span-1 rounded-2xl border p-4 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition ${className}`}
    >
      <div className="mb-4">{header}</div>

      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
          {title}
        </h3>
      </div>

      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </div>
    </div>
  );
};