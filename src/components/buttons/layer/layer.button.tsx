import React, { useCallback, useMemo } from 'react';

interface LayerButtonProps {
  layerSlug: string;
  index: number;
  url: string;
  extension: string;
  onLayerSelect: (index: number) => void;
}

export const LayerButton = React.memo(
  ({ layerSlug, index, url, extension, onLayerSelect }: LayerButtonProps) => {
    const handleClick = useCallback(() => {
      onLayerSelect(index);
    }, [index, onLayerSelect]);

    const srcSet = useMemo(
      () => `${url}/${layerSlug}-thumb.${extension}`,
      [url, layerSlug, extension],
    );

    const fallbackSrc = useMemo(
      () => `${url}/${layerSlug}-thumb.png`,
      [url, layerSlug],
    );

    return (
      <button
        aria-label={`Select layer ${layerSlug}`}
        className={'nappr-map__layer-button'}
        type="button"
        onClick={handleClick}>
        <picture>
          <source srcSet={srcSet} type={`image/${extension}`} />
          <img
            alt={`Layer ${layerSlug} thumbnail`}
            height={32}
            loading="lazy"
            src={fallbackSrc}
            width={32}
          />
        </picture>
      </button>
    );
  },
);

LayerButton.displayName = 'LayerButton';
