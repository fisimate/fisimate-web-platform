import React from "react";

export default function Thead({ headerGroups, action }) {
  if (!headerGroups) return null;

  return (
    <thead>
      {headerGroups.map((headerGroup) => {
        const headerGroupProps = headerGroup.getHeaderGroupProps();
        return (
          <tr
            key={headerGroupProps.key}
            {...headerGroupProps}
            className="bg-gray-2 text-left dark:bg-meta-4"
          >
            <th className="w-[20px] px-4 py-4 font-medium text-black dark:text-white">
              No
            </th>
            {headerGroup.headers.map((column, index) => {
              const columnProps = column.getHeaderProps(
                column.getSortByToggleProps()
              );
              return (
                <th
                  key={columnProps.key}
                  {...columnProps}
                  className={`min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ${
                    column.width || ""
                  }`}
                >
                  {column.render("Header")}
                </th>
              );
            })}
            {action && (
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            )}
          </tr>
        );
      })}
    </thead>
  );
}
