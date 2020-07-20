import React from 'react';

export function CreditCardGiveIcon(props: React.SVGProps<SVGSVGElement>) {
  const { fill = '#52AE30', ...restProps } = props;
  return (
    <svg
      width="70"
      height="45"
      viewBox="0 0 70 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}>
      <path
        opacity="0.3"
        d="M28 20.143V30C28 33.3137 30.6863 36 34 36H64C67.3137 36 70 33.3137 70 30V15H37.7325C37.7192 15.0558 37.7055 15.1115 37.6914 15.1671C37.1102 17.457 35.1884 19.124 32.8871 19.4453L32.8796 19.4464L28 20.143Z"
        fill={fill}
      />
      <path
        d="M1 41.8C11.8 41.8 7.48 44 35.56 44C44.2 44 52.84 41.8 55 33"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 20.3219H7.89272C8.73051 20.3224 9.52415 19.9536 10.0543 19.3175L21.7736 8L32.8535 10.1733C34.4334 10.4825 35.4723 11.7196 34.7836 14.4291C34.5093 15.5098 33.5934 16.3191 32.4686 16.4747L27.043 17.2492C26.3832 17.3139 25.7789 17.6395 25.3693 18.1508C24.9598 18.6621 24.7805 19.315 24.8728 19.9588V27.2134C24.6912 28.0403 24.2451 28.7888 23.5995 29.3498L17.5865 34"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.8421 33H62.5789C65.0206 33 67 31.0897 67 28.7333V5.26667C67 2.91025 65.0206 1 62.5789 1H29.4211C26.9794 1 25 2.91025 25 5.26667V8.16231"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M57 20.5H53" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
