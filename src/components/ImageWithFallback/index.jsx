import React, { useState, useEffect } from "react";
import { FiImage } from "react-icons/fi";

export default function ImageWithFallback({
  src,
  fallbackSrc = "/images/user/user-avatar.png",
  alt = "image",
  className,
  style,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isFallbackFailed, setIsFallbackFailed] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsFallbackFailed(false);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setIsFallbackFailed(true);
    }
  };

  if (isFallbackFailed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 dark:bg-meta-4 text-gray-400 ${className || ""}`}
        style={{
          backgroundColor: "rgb(229 231 235)",
          color: "rgb(156 163 175)",
          borderRadius: "0.375rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
        {...props}
      >
        <FiImage size={24} />
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      style={style}
      {...props}
    />
  );
}
