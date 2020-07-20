import React from 'react';

export function TabletIcon(props: React.SVGProps<any>) {
    const { width = 66, height = 67, ...restProps } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 66 67"
            {...restProps}>
            <g fill="none" fillRule="evenodd">
                <path d="M-2-2h70v70H-2z" />
                <path
                    stroke="#52AE30"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M23.295 49.895h-13.03a5.216 5.216 0 0 1-5.213-5.215V10.776a5.216 5.216 0 0 1 5.212-5.216h49.519a5.214 5.214 0 0 1 5.212 5.216v23.472"
                />
                <path fill="#52AE30" fillOpacity=".3" d="M18.614 13.858h41.7v33.895h-41.7z" />
                <path
                    stroke="#52AE30"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M23.295 44.68h-7.818V10.776h41.7v23.472"
                />
                <path
                    fill="#FFF"
                    stroke="#52AE30"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M49.358 38.966V25.042c0-1.396-.568-2.53-1.955-2.53H43.63c-1.386 0-2.09 1.134-2.09 2.53V49.09l-4.483-5.368c-.477-.607-1.305-.96-2.077-.96l-2.603.05a2.543 2.543 0 0 0-2.244 3.748l9.737 17.669a2.497 2.497 0 0 0 2.2 1.317h16.643a2.517 2.517 0 0 0 2.324-1.565l3.962-17.424c0-1.11-.482-2.203-1.538-2.53l-14.102-5.061z"
                />
                <path
                    stroke="#52AE30"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.567 27.728a1.304 1.304 0 0 1-2.606 0 1.304 1.304 0 0 1 2.606 0z"
                />
                <path
                    stroke="#52AE30"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M1 18.077V9.78c0-4.582 3.71-8.298 8.29-8.298h15.798M29.747 1.481h2.266M37.313 28.02H25.985a2.998 2.998 0 0 1-3.005-3.01v-3.02a3.006 3.006 0 0 1 3.003-3.01h24.095"
                    opacity=".5"
                />
            </g>
        </svg>
    );
}
