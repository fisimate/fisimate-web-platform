"use client";
import Image from "next/image";
import React from "react";

export default function TBody({ data, action, fields }) {
  const renderField = (field, value) => {
    if (field === "icon" || field == "user.profilePicture") {
      return (
        <Image
          src={value ?? "/images/user/user-avatar.png"}
          alt="icon"
          width={240}
          height={240}
          loading="lazy"
          className="h-16 w-16 object-cover rounded-md"
        />
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
    <tbody>
      {data?.map((item, key) => (
        <tr key={key}>
          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <div className="flex items-center space-x-3.5">
              <p className="text-black dark:text-white">{key + 1}</p>
            </div>
          </td>
          {fields.map((field, i) => (
            <td
              key={i}
              className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
            >
              <p className="text-black dark:text-white">
                {renderField(field, getField(item, field))}
              </p>
            </td>
          ))}
          {action && (
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <p className="text-black dark:text-white flex gap-3">
                  {action(item)}
                </p>
              </div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}
