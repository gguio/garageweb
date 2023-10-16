import * as React from "react";

type svgProps = {
    width?: number;
    height?: number;
    currentcolor: string;
};

const SvgComponent = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width ? props.width : 37}
        height={props.height ? props.height : 16}
        fill={props.currentcolor}
        viewBox={`0 0 37 20`}
    >
        <path d="M1 7a1 1 0 0 0 0 2V7Zm35.707 1.707a1 1 0 0 0 0-1.414L30.343.929a1 1 0 1 0-1.414 1.414L34.586 8l-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364ZM1 9h35V7H1v2Z" />
    </svg>
);
export default SvgComponent;
