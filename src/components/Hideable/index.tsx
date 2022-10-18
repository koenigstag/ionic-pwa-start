import React, { FC } from 'react';

export interface IHideable {
  show?: boolean;
  hide?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

const Hideable: FC<IHideable> = ({ hide = false, show = !hide, children }) => {
  if (!show || hide) {
    return null;
  }

  return <>{children}</>;
};

export default Hideable;
