import getLastPathUrl from "@/utils/getLastPathUrl";
import Link from "next/link";
import React from "react";
import { FiExternalLink } from "react-icons/fi";

export default function TBody({
  getTableBodyProps,
  page,
  prepareRow,
  action,
  fields,
}) {
  const renderField = (field, value) => {
    if (
      field === "icon" ||
      field === "user.profilePicture" ||
      field === "profilePicture"
    ) {
      return (
        <img
          src={value ?? "/images/user/user-avatar.png"}
          alt="icon"
          className="h-16 w-16 object-contain rounded-md"
        />
      );
    }

    if (field === "filePath") {
      return (
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-2 hover:text-primary"
        >
          {getLastPathUrl(value)} <FiExternalLink />
        </Link>
      );
    }

    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }

    return value;
  };

  const getField = (item, field) => {
    if (field.includes(".")) {
      const keys = field.split(".");
      let value = item;
      for (let key of keys) {
        value = value[key];
      }
      return value;
    }
    return item[field];
  };

  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <p className="text-black dark:text-white">{row.index + 1}</p>
              </div>
            </td>
            {fields.map((field, i) => (
              <td
                key={i}
                className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
              >
                <p className="text-black dark:text-white">
                  {renderField(field, getField(row.original, field))}
                </p>
              </td>
            ))}
            {action && (
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <p className="text-black dark:text-white flex gap-3">
                    {action(row.original)}
                  </p>
                </div>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
}
