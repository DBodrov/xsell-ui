import React from 'react';

export function MoneyATM(props: React.SVGAttributes<any>) {
  const { fill = '#9E9E9E', ...restProps } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}>
      <g id="icon-green/money atm 3">
        <g id="Line_Icons">
          <g id="Group">
            <path
              id="Shape"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.414 6L17 8.586V6H19V20C19 20.552 18.552 21 18 21H6C5.448 21 5 20.552 5 20V6H7V12.586L13.414 19H17V11.415L11.586 6H14.414ZM10.586 19L7 15.415V19H10.586Z"
              fill={fill}
            />
            <path
              id="Shape_2"
              d="M23 3H1C0.448 3 0 3.448 0 4V10C0 10.552 0.448 11 1 11H4V9H2V5H22V9H20V11H23C23.552 11 24 10.552 24 10V4C24 3.448 23.552 3 23 3Z"
              fill={fill}
            />
            <path
              id="Shape_3"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 9C13.654 9 15 10.346 15 12C15 13.654 13.654 15 12 15C10.346 15 9 13.654 9 12C9 10.346 10.346 9 12 9ZM12 11C11.449 11 11 11.449 11 12C11 12.551 11.449 13 12 13C12.551 13 13 12.551 13 12C13 11.449 12.551 11 12 11Z"
              fill={fill}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
