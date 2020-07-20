import React from 'react';

export function HourglassIcon(props: React.SVGAttributes<any>) {
  const { fill = '#9E9E9E', ...restProps } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}>
      <g id="icon/hourglass">
        <g id="Line_Icons">
          <g id="Group">
            <path
              id="Shape"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19 5.171V3C19 2.448 18.552 2 18 2H6C5.448 2 5 2.448 5 3V5.172C5 5.962 5.32 6.735 5.879 7.293L10.586 12L5.879 16.708C5.312 17.274 5 18.027 5 18.829V21C5 21.552 5.448 22 6 22H18C18.552 22 19 21.552 19 21V18.829C19 18.027 18.688 17.274 18.121 16.707L13.414 12L18.121 7.293C18.68 6.734 19 5.961 19 5.171ZM17 18.829V20H7V18.829C7 18.561 7.104 18.31 7.293 18.121L12 13.414L16.707 18.122C16.896 18.31 17 18.561 17 18.829ZM16.707 5.878C16.893 5.692 17 5.434 17 5.171V4H7V5.171C7 5.434 7.107 5.692 7.293 5.878L12 10.585L16.707 5.878Z"
              fill={fill}
            />
            <path id="Shape_2" d="M9 19L12 16L15 19H9Z" fill={fill} />
          </g>
        </g>
      </g>
    </svg>
  );
}
