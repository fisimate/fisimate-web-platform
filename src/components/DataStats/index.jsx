import React from "react";

export default function DataStats({ label, value, icon }) {
  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
      {icon}
      <h4 className="mb-2 mt-5 font-medium">{label}</h4>
      <h3 className="mb-2 text-title-md font-bold text-black dark:text-white">
        {value}
      </h3>
    </div>
  );
}
