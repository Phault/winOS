import React, { FC, Ref, useState, ReactElement, useEffect, useContext } from 'react';
import { useRefCallback } from '../../misc/hooks/useRefCallback';
import { SelectionContext } from "./Selection";

export interface SelectableItemProps<T = undefined> {
    children: (props: SelectableItemChildProps) => ReactElement;
    data: T;
}

export interface SelectableItemChildProps {
  ref: Ref<HTMLElement>;
  selected?: boolean;
}

export const SelectableItem = <T extends {}>({children, data}: SelectableItemProps<T>) => {
    const context = useContext(SelectionContext);

    const [ref, refCallback] = useRefCallback<HTMLElement | null>(null);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (!context || !ref) return;

        context.register(ref, { setSelected, data } );
        return () => context.unregister(ref);
    }, [context, ref, setSelected, data]);

    return children({ref: refCallback, selected});
};

export function asSelectable<P, D = any>(WrappedComponent: React.ComponentType<P & SelectableItemChildProps>): FC<P & SelectableItemProps<D>> {
    return ({data, ...rest}: P & SelectableItemProps<D>) => (
        <SelectableItem data={data}>
            {selectableProps => <WrappedComponent {...(rest as P)} {...selectableProps} />}
        </SelectableItem>
    );
}