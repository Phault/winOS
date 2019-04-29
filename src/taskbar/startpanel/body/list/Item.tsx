import React from 'react';
import { Icon } from '../../../../widgets/Icon';
import fallbackIcon from '../../../../assets/icons/apps/default.png';
import styled from 'styled-components/macro';

export const StyledItem = styled.div`
    color: rgb(55, 55, 56);
    display: flex;
    align-items: center;
    margin: 2px 5px;
    padding: 2px 2px;

    &:hover {
        color: white;
        background: rgb(48, 112, 208);
        background-clip: padding-box;

        .content p {
            color:white;
        }
    }

    .icon {
        width: 32px !important;
        height: 32px !important;
    }

    .content {
        flex: 1 0;
        margin-left: 4px;

        h1, p {
            margin: 0;
            font-size: 11px;
            font-weight: normal;
        }
        
        h1:not(:only-child) {
            font-weight: bold;
        }
    
        p {
            color: rgb(128, 128, 128);
        }
    }
`;

export interface ItemProps {
    title: string;
    subtitle?: string;
    icon?: string;
    onClick?: () => void;
    className?: string;
}

export const Item: React.FC<ItemProps> = ({title, subtitle, icon, onClick, className}) => (
    <StyledItem className={className} onClick={onClick}>
        <Icon src={icon || fallbackIcon} />
        <div className="content">
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
        </div>
    </StyledItem>
);