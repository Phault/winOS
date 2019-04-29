import React, { HTMLAttributes, FC } from "react";
import windowsIcon from "../assets/widgets/windows.png";
import { TaskBarItem } from "./TaskBarItem";
import styled from "styled-components/macro";
import classNames from "classnames";

const StyledStartButton = styled(TaskBarItem)`
    min-width: 97px;
    height: 31px;
    padding: 2px 22px 2px 8px;
    margin-right: 9px;
    display: flex;
    align-items: center;
    
    color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 19px;
    font-style: italic;
    text-shadow: 0.5px 0.5px 3px rgb(69, 76, 16);
    line-height: 0;
    filter: drop-shadow(1px 1px 1px rgba(255,255,255,0.2));

    border: 1px solid #196448;
    border-top-right-radius: 5px 50%;
    border-bottom-right-radius: 5px 50%;

    background: linear-gradient(-15deg, #49B149 45%, #389538 65%);
    box-shadow:
        inset 1px 1px 3px #196448,
        inset -1px -1px 2px #2C743A,
        inset -10px 0 15px -7px #1D5F1Dcc,
        inset 0 -10px 4px -9px #1D5F1D,
        inset 2px 4px 5px rgba(255,255,255,0.6);
    
    &:hover {
        border-color: #228321;
        background: linear-gradient(-15deg, #45CC44 45%, #40AD40 65%);
        box-shadow:
            inset 1px 1px 3px #55A955,
            inset -1px -1px 2px #228321,
            inset -10px 0 15px -7px #1D5F1Dcc,
            inset 0 -10px 4px -9px #1D5F1Dcc,
            inset 2px 4px 5px rgba(255,255,255,0.7);
    }

    &:active, &.active {
        border-color: #094009;
        background: linear-gradient(-15deg, #169316 35%, #157F15 75%);
        box-shadow:
            inset 0 -12px 2px -10px #09400999,
            inset -10px 0 10px -10px #09400999,
            inset 10px 10px 5px -10px #094009,
            inset 10px 0 15px -7px #1D5F1Dcc,
            inset 0 10px 4px -9px #1D5F1Dcc;
    }

    img {
        margin-right: -1px;
    }
`;

export interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  label?: string;
}

export const StartButton: FC<ButtonProps> = ({ label, active, ...rest }) => (
  <StyledStartButton className={classNames({ active })} {...rest}>
    <img src={windowsIcon} draggable={false} />
    {label}
  </StyledStartButton>
);

StartButton.defaultProps = {
  label: "start"
};
