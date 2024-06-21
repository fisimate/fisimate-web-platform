"use client";

import React from "react";

export default function Dashboard() {
  return (
    <React.Fragment>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-medium">Welcome, Admin!</p>
          <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">
            Dashboard
          </h2>
        </div>
      </div>
    </React.Fragment>
  );
}
