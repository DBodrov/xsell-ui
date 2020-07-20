import React from 'react';

export function InfoCircleIcon(props: React.SVGAttributes<any>) {
  const { className } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M12 22C6.486 22 2 17.515 2 12C2 6.487 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.515 17.514 22 12 22ZM12 4C7.589 4 4 7.589 4 12C4 16.411 7.589 20 12 20C16.411 20 20 16.411 20 12C20 7.589 16.411 4 12 4Z"
        fill="#52AE30"
      />
      <path d="M13 15V11C13 10.448 12.553 10 12 10H10V12H11V15H9V17H15V15H13Z" fill="#52AE30" />
      <path
        d="M12 9.25C12.6904 9.25 13.25 8.69036 13.25 8C13.25 7.30964 12.6904 6.75 12 6.75C11.3096 6.75 10.75 7.30964 10.75 8C10.75 8.69036 11.3096 9.25 12 9.25Z"
        fill="#52AE30"
      />
    </svg>
  );
}
