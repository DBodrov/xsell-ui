import React from 'react';

export function PhonespeakerIcon(props: any) {
  const { fill = '#52AE30', ...restProps } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}>
      <g id="icon/phone speaker">
        <g id="Line_Icons">
          <g id="Group">
            <path id="Shape" d="M17 13H15C15 10.795 13.206 9 11 9V7C14.309 7 17 9.691 17 13Z" fill={fill} />
            <path id="Shape_2" d="M21 13H19C19 8.589 15.411 5 11 5V3C16.515 3 21 7.486 21 13Z" fill={fill} />
            <path id="Shape_3" d="M11 11V13H13C13 11.896 12.105 11 11 11Z" fill={fill} />
            <path
              id="Shape_4"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13 23H18C19.104 23 20 22.104 20 21V17C20 15.896 19.103 15 18 15H14C12.924 15 12.043 15.855 12.001 16.922C9.459 16.518 7.529 14.582 7.092 11.998C8.152 11.949 9 11.072 9 10V6C9 4.896 8.103 4 7 4H3C1.897 4 1 4.896 1 6V11C1 17.617 6.384 23 13 23ZM3 11V6H7V10H6C5.732 10 5.476 10.108 5.288 10.299C5.1 10.49 4.997 10.748 5 11.016C5.072 15.567 8.512 19 13 19C13.552 19 14 18.553 14 18V17H18L18.001 21H13C7.486 21 3 16.514 3 11Z"
              fill={fill}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
