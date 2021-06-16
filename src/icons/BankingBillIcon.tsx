import React from 'react';

export function BankingBillIcon(props: React.SVGProps<SVGSVGElement>) {
  const {fill = 'var(--color-primary)', ...restProps} = props;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
      <path
        d="M16 19.382L13.447 18.105C13.127 17.945 12.743 17.969 12.445 18.168L10 19.798L7.555 18.168C7.388 18.057 7.194 18 7 18C6.848 18 6.693 18.035 6.553 18.105L4 19.382V4.619L6.553 5.893C6.873 6.054 7.256 6.03 7.555 5.831L10 4.202L12.445 5.832C12.743 6.031 13.127 6.055 13.447 5.894L16 4.619V8H18V3C18 2.653 17.82 2.332 17.525 2.15C17.23 1.967 16.862 1.951 16.552 2.105L13.072 3.847L10.554 2.168C10.218 1.944 9.781 1.944 9.445 2.168L6.928 3.847L3.448 2.105C3.137 1.951 2.77 1.967 2.475 2.15C2.18 2.332 2 2.653 2 3V21C2 21.347 2.18 21.668 2.475 21.852C2.77 22.033 3.137 22.05 3.448 21.894L6.928 20.154L9.446 21.832C9.782 22.056 10.219 22.056 10.555 21.832L13.073 20.154L16.553 21.894C16.693 21.965 16.848 22 17 22C17.183 22 17.365 21.95 17.525 21.852C17.82 21.668 18 21.347 18 21V17H16V19.382Z"
        fill={fill}
      />
      <path
        d="M14.9999 10.5859L13.5859 11.9999L16.9999 15.4139L22.4139 9.99994L20.9999 8.58594L16.9999 12.5859L14.9999 10.5859Z"
        fill={fill}
      />
      <rect x="6" y="8" width="5" height="2" fill={fill} />
      <rect x="6" y="11" width="4" height="2" fill={fill} />
      <rect x="6" y="14" width="6" height="2" fill={fill} />
    </svg>
  );
}
