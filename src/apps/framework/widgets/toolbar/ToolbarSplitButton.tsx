import React, { useRef, ReactElement } from 'react';
import { ToolbarDropdown } from './ToolbarDropdown';

export const ToolbarSplitButton: React.FC = ({ children }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const childrenWithProps = React.Children.map(children, child => {
        const childElement = (child as ReactElement);
        if (childElement.type === ToolbarDropdown) {
            return React.cloneElement(
                childElement,
                {
                    dropdownParent: ref
                }
            );
        }

        return child;
    });

    return (
        <div className="toolbar-split" ref={ref}>
            {childrenWithProps}
        </div>
    );
};
