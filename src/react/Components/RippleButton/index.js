import React from "react";
import { RippleContainer } from "./styles";
import { AccentColor } from "../../../AppStyles";
/**
 * @param duration - Duration of a ripple effect.
 * @param color - Background color of a ripple.
 */
export function Ripple({ duration = 1000, color = AccentColor }) {
    const [rippleArray, setRippleArray] = React.useState([]);
    React.useEffect(() => {
        let bounce;
        if (rippleArray.length > 0) {
            window.clearTimeout(bounce);
            bounce = window.setTimeout(() => {
                setRippleArray([]);
                window.clearTimeout(bounce);
            }, duration * 4);
        }
        return () => window.clearTimeout(bounce);
    }, [rippleArray.length, duration]);
    const addRipple = (event) => {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const size = rippleContainer.width > rippleContainer.height
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
    return (React.createElement(RippleContainer, { duration: duration, color: color, onMouseDown: addRipple }, rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
            return (React.createElement("span", { key: "span" + index, style: {
                    top: ripple.y,
                    left: ripple.x,
                    width: ripple.size,
                    height: ripple.size
                } }));
        })));
}
