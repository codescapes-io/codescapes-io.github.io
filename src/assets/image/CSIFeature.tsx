import React from 'react';

interface CSIFeatureProps {
    width: number
    height: number
}

const CSIFeature: React.FC<CSIFeatureProps> = (props) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 677 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="677" height="500" rx="12" fill="#C4C4C4" />
        </svg>
    );
};

export default CSIFeature;
