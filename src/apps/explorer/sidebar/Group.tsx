import React, { HTMLAttributes, FC } from 'react';
import styled from 'styled-components/macro';

interface GroupProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
}

const GroupBase: FC<GroupProps> = ({label, children, ...rest}) => (
    <section {...rest}>
        <header>{label}</header>
        <ul>
            {children}
        </ul>
    </section>
);

export const Group = styled(GroupBase)`
    background: white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: rgb(33, 93, 198);
    margin-bottom: 15px;
    font-family: 'Tahoma';
    font-size: 11px;

    header {
        background: linear-gradient(to right, white, rgb(198, 211, 247));
        height: 25px;
        font-weight: bold;
        padding: 7px 13px;
        margin: 0;
    }

    ul {
        margin: 0;
        list-style: none;
        padding-left: 0;

        // previously in body div
        background: rgb(214, 223, 247);
        border: 1px solid white;
        border-top: 0;
        padding: 10px 12px;
    }
`;
