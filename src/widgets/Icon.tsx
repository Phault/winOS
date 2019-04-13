import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { useImageDimensions } from '../misc/useImageDimensions';

interface IconProps {
    src: string;
    width?: number;
    height?: number;
    className?: string;
    style?: CSSProperties;
}

const Icon: React.FC<IconProps> = ({src, width, height, className, style}) => {
    const dimensions = useImageDimensions(src);
    
    const styles: CSSProperties = {
        background: `url(${src}) center / contain no-repeat`,
        width: width !== undefined ? width : dimensions.width,
        height: height !== undefined ? height : dimensions.height,
        ...style
    };

    return <div className={classNames("icon", className)} style={styles} />;
}

export { Icon };