import loadable from '@loadable/component';
import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';
import { TbCategory } from 'react-icons/tb';

interface IconComponentProps {
  icon: string;
  iconProps?: IconBaseProps | undefined;
}

const getLibrary = (icon: string): string => {
  const libname = icon
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')[0]
    .toLocaleLowerCase();
  return libname;
};

export const IconComponent: React.FC<IconComponentProps> = React.memo(
  ({ icon, iconProps }: IconComponentProps) => {
    const iconLibrary = getLibrary(icon);
    const ElementIcon = loadable(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      () => import(`react-icons/${iconLibrary}/index.js`),
      {
        resolveComponent: (module: JSX.Element) => {
          const Icon = module[icon as keyof JSX.Element] as IconType;
          return Icon;
        },
      }
    );
    const props = {
      className: 'mr6',
      opacity: 0.5,
      size: 18,
      ...(iconProps || {}),
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ElementIcon fallback={<TbCategory {...props} />} {...props} />;
  }
);

IconComponent.defaultProps = {
  iconProps: undefined,
};

IconComponent.displayName = 'IconComponent';
