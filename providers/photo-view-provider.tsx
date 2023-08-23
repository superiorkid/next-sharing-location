"use client";

import React from "react";
import { PhotoProvider } from "react-photo-view";

function PhotoViewProvider({ children }: { children: React.ReactNode }) {
  return <PhotoProvider maskOpacity={0.5}>{children}</PhotoProvider>;
}

export default PhotoViewProvider;
