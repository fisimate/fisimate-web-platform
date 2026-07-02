import React from "react";
import { flexRender } from "@tanstack/react-table";

export default function Thead({ headerGroups, action }) {
  if (!headerGroups) return null;

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr
          key={headerGroup.id}
          className="bg-gray-2 text-left dark:bg-meta-4"
        >
          <th className="w-[20px] px-4 py-4 font-medium text-black dark:text-white">
            No
          </th>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white cursor-pointer"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              {{ asc: " ↑", desc: " ↓" }[header.column.getIsSorted()] ?? null}
            </th>
          ))}
          {action && (
            <th className="px-4 py-4 font-medium text-black dark:text-white">
              Aksi
            </th>
          )}
        </tr>
      ))}
    </thead>
  );
}
