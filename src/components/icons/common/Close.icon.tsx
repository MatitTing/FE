import { FC } from 'react';

interface CloseIconProps {
    size?: number;
    color?: string;
}

const CloseIcon: FC<CloseIconProps> = ({ size = 24, color = 'black' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size}>
        <path
            fill={color}
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        />
    </svg>
);

export default CloseIcon;
