import React from "react";

export default function Thead({ headerGroups, action }) {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          className="bg-gray-2 text-left dark:bg-meta-4"
        >
          <th className="w-[20px] px-4 py-4 font-medium text-black dark:text-white">
            No
          </th>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              className={`min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ${
                column.width || ""
              }`}
            >
              {column.render("Header")}
            </th>
          ))}
          {action && (
            <th className="px-4 py-4 font-medium text-black dark:text-white">
              Actions
            </th>
          )}
        </tr>
      ))}
    </thead>
  );
}
