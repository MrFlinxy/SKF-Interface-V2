"use client";
import dynamic from "next/dynamic";

const MolViz = dynamic(() => import("./MolViz"), {
  ssr: false,
});

export default MolViz;
