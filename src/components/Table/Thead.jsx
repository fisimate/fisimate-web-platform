import React from "react";

export default function Thead({ data }) {
  return (
    <thead>
      <tr className="bg-gray-2 text-left dark:bg-meta-4">
        <th className="w-[20px] px-4 py-4 font-medium text-black dark:text-white">
          No
        </th>
        {data.map((header, i) => (
          <th
            key={i}
            className={`min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ${
              header.width || ""
            }`}
          >
            {header.title}
          </th>
        ))}
        <th className="px-4 py-4 font-medium text-black dark:text-white">
          Actions
        </th>
      </tr>
    </thead>
  );
}
