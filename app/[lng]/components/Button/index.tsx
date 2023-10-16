import { ReactNode } from "react";
import styles from "./Button.module.css";

export default function Button({
    children,
    style,
    styleContainer,
    classNameContainer,
    classNameInner,
    onClick,
}: {
    children: ReactNode | string;
    style?: any;
    styleContainer?: any;
    classNameContainer?: string;
    classNameInner?: string;
    onClick?: any;
}) {
    return (
        <div
            className={
                classNameContainer ? classNameContainer : styles.buttonContainer
            }
            style={styleContainer ? styleContainer : null}
        >
            <button
                onClick={onClick ? onClick : null}
                className={classNameInner ? classNameInner : styles.button}
                style={style ? style : null}
            >
                {children}
            </button>
        </div>
    );
}
