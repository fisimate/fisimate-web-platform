"use client"
import React from "react";

export default function TableAction({ icon, action }) {
  return (
    <button className="hover:text-primary" onClick={action}>
      {icon}
    </button>
  );
}
