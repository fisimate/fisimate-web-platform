import React from "react";

export default function Button({ variant = "solid", text, ...rest }) {
  if (variant == "solid") {
    return (
      <button
        className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        {...rest}
      >
        {text}
      </button>
    );
  } else if (variant == "outline") {
    return (
      <button
        className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        {...rest}
      >
        {text}
      </button>
    );
  }
}
