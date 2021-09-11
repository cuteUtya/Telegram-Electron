import React from "react";
import { RippleContainer } from "./styles";
import {AccentColor} from "../../../AppStyles";

type RippleItem = {
    x: number;
    y: number;
    size: number;
};

type RippleProps = {
    duration: number;
    color: string;
};

/**
 * @param duration - Duration of a ripple effect.
 * @param color - Background color of a ripple.
 */

export function Ripple({ duration = 1000, color = AccentColor }: RippleProps) {
    const [rippleArray, setRippleArray] = React.useState<RippleItem[]>([]);

    React.useEffect(() => {
        let bounce: number | undefined;

        if (rippleArray.length > 0) {
            window.clearTimeout(bounce);

            bounce = window.setTimeout(() => {
                setRippleArray([]);
                window.clearTimeout(bounce);
            }, duration * 4);
        }

        return () => window.clearTimeout(bounce);
    }, [rippleArray.length, duration]);

    const addRipple = (event: React.MouseEvent) => {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const size =
            rippleContainer.width > rippleContainer.height
                ? rippleContainer.width
                : rippleContainer.height;
        const x = event.pageX - rippleContainer.left - size / 2;
        const y = event.pageY - rippleContainer.top - size / 2;
        const newRipple = {
            x,
            y,
            size
        };

        setRippleArray([...rippleArray, newRipple]);
    };

    return (
        <RippleContainer duration={duration} color={color} onMouseDown={addRipple}>
        {rippleArray.length > 0 &&
                rippleArray.map((ripple, index) => {
                    return (
                        <span
                            key={"span" + index}
                    style={{
                        top: ripple.y,
                            left: ripple.x,
                            width: ripple.size,
                            height: ripple.size
                    }}
                    />
                );
                })}
        </RippleContainer>
);
}
