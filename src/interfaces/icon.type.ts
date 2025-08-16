import { ReactNode, SVGAttributes } from 'react';

export interface MapIconBaseProps extends SVGAttributes<SVGElement> {
  children?: ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

export type MapIconType = (props: MapIconBaseProps) => ReactNode;
