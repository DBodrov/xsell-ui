import React from 'react';

export function PercentCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 6C10.654 6 12 7.346 12 9C12 10.655 10.654 12 9 12C7.346 12 6 10.654 6 9C6 7.347 7.346 6 9 6ZM9 8C8.449 8 8 8.449 8 9C8 9.552 8.449 10 9 10C9.551 10 10 9.552 10 9C10 8.449 9.551 8 9 8Z"
        fill="#9E9E9E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 15C12 13.346 13.346 12 15 12C16.654 12 18 13.347 18 15C18 16.654 16.654 18 15 18C13.346 18 12 16.654 12 15ZM14 15C14 15.552 14.449 16 15 16C15.551 16 16 15.552 16 15C16 14.449 15.551 14 15 14C14.449 14 14 14.449 14 15Z"
        fill="#9E9E9E"
      />
      <rect
        width="11.3139"
        height="1.99998"
        transform="matrix(0.707104 -0.70711 0.707104 0.70711 7.2926 15.294)"
        fill="#9E9E9E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.485 22 12C22 17.515 17.514 22 12 22C6.486 22 2 17.514 2 12ZM4 12C4 16.411 7.589 20 12 20C16.411 20 20 16.411 20 12C20 7.589 16.411 4 12 4C7.589 4 4 7.589 4 12Z"
        fill="#9E9E9E"
      />
    </svg>
  );
}
