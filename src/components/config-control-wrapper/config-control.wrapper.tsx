import React, { ReactNode } from 'react';

interface ConfigControlWrapperProps {
  children: ReactNode;
  className: string;
}

export const ConfigControlWrapper = React.memo(
  ({ children, className }: ConfigControlWrapperProps) => (
    <div className={className}>{children}</div>
  ),
);

ConfigControlWrapper.displayName = 'ConfigControlWrapper';
