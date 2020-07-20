import React from 'react';

export function ShieldIcon(props: React.SVGProps<any>) {
  const { stroke = '#C5C5C5', width = 26, height = 26, ...restProps } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0078 1.29999C13.0078 1.29999 10.4774 5.765 3.25 5.765C3.25 13.2153 3.7375 20.9173 13 24.2096C22.2625 20.9173 22.75 13.2153 22.75 5.765C15.7401 5.765 13.0078 1.29999 13.0078 1.29999Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.09998 13.1596L12.7773 16.4096L18.85 9.25958"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
