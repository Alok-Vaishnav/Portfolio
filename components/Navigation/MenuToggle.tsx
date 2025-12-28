import * as React from "react";

interface menuToggleProps {
  toggle: () => boolean | void;
  toggleState: boolean;
}

export const MenuToggle: React.FC<menuToggleProps> = ({
  toggle,
  toggleState,
}) => (
  <div className="toggle-button-wrapper" onClick={toggle}>
    {toggleState ? <span>Close</span> : <span>Let’s begin</span>}
  </div>
);
