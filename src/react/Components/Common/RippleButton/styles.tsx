/*Thank for code https://frontend-stuff.com/blog/ripple-effect-in-react/*/

import styled from "styled-components";

type ButtonProps = {
    readonly color?: string;
};

export const Button = styled.button<ButtonProps>`
  position: relative;
  padding: 5px 30px;
  overflow: hidden;
  cursor: pointer;
  background: ${props => (props.color ? props.color : "tomato")};
  color: #fff;
  font-size: 20px;
  border-radius: 20px;
  border: 1px solid #fff;
  text-align: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
`;

type RippleContainerProps = {
    readonly color: string;
    readonly duration: number;
};

export const RippleContainer = styled.div<RippleContainerProps>`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  position: absolute;
  border-radius: inherit;

  span {
    position: absolute;
    transform: scale(0);
    border-radius: 100%;
    opacity: 0.25;
    background-color: ${props => props.color};
    animation-name: ripple;
    animation-duration: ${props => props.duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;
