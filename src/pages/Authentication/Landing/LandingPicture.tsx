import React from 'react';

interface ILangingProps {
  imageSet: { src: string; sizes: number; maxWidth: number }[];
}

export function LandingPicture({ imageSet = [] }: ILangingProps) {
  return (
    <picture>
      {imageSet.map((set, i) => (
        <source key={i} media={`(max-width: ${set.maxWidth}px)`} srcSet={set.src} sizes={`${set.sizes}px`} />
      ))}
      <img src={imageSet[1].src} alt="landing photo" />
    </picture>
  );
}
