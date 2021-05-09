import React from "react";
import "../styles/Skeleton.css";

interface SkeletonStyle {
  style: string;
}

const Skeleton = ({ ...props }: SkeletonStyle) => {
  const classes = `skeleton ${props.style}`;

  return <div className={classes}></div>;
};

export default Skeleton;
