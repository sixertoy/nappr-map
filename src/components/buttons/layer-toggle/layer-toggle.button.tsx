import React, { useMemo } from 'react';

import { MapBackIcon, MapCloseIcon } from '../../icons';

interface LayerToggleButtonProps {
  opened: boolean;
  toggleTilesMenu: () => void;
}

export const LayerToggleButton = React.memo(
  ({ opened, toggleTilesMenu }: LayerToggleButtonProps) => {
    // Memoize toggle icon to avoid conditional rendering on each render
    const toggleIcon = useMemo(() => {
      return opened ? <MapCloseIcon size={24} /> : <MapBackIcon size={24} />;
    }, [opened]);

    const ariaLabel = opened ? 'Close layers menu' : 'Open layers menu';

    return (
      <button
        aria-expanded={opened}
        aria-label={ariaLabel}
        className={'nappr-map__layer-toggle-button'}
        type="button"
        onClick={toggleTilesMenu}>
        {toggleIcon}
      </button>
    );
  },
);

LayerToggleButton.displayName = 'LayerToggleButton';
