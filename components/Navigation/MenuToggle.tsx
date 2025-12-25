import * as React from "react";
import { motion } from "framer-motion";

interface menuToggleProps {
  toggle: () => boolean | void;
  toggleState: boolean;
}

interface pathProps {
  d?: string;
  variants?: {
    closed: {};
    open: {};
  };
  transition?: { duration: number };
}

const Path = (props: pathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="1.5"
    stroke="#c4c4c4"
    {...props}
  />
);

export const MenuToggle: React.FC<menuToggleProps> = ({
  toggle,
  toggleState,
}) => (
  <div className="toggle-button-wrapper" onClick={toggle}>
    {toggleState ? <span>Close</span> : <span>Let’s begin</span>}
  </div>
);
