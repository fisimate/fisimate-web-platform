import React from "react";

export default function Button({
  variant = "solid",
  text,
  size = "lg",
  ...rest
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-center font-medium";
  const sizeClasses = {
    lg: "px-10 py-4 lg:px-8 xl:px-10",
    md: "px-6 py-2",
  };
  const variantClasses = {
    solid: `bg-primary text-white hover:bg-opacity-90`,
    outline: `border border-primary text-primary hover:bg-opacity-90`,
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
      {...rest}
    >
      {text}
    </button>
  );
}
