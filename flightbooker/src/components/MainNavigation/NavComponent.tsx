import React from "react";
import { Link } from "react-router-dom";

interface NavComponentProps {
  horizontalPosition: "left" | "right" | "none" | "inline-start" | "inline-end";
  path: string;
  title: string;
}

const NavComponent: React.FC<NavComponentProps> = ({
  horizontalPosition,
  path,
  title,
}) => {
  const orientation: React.CSSProperties = { float: horizontalPosition };
  return (
    <li style={orientation}>
      <Link to={path}> {title} </Link>
    </li>
  );
};

export default NavComponent;
