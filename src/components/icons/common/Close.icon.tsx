import { FC } from 'react';

interface CloseIconProps {
    size?: number;
}

const CloseIcon: FC<CloseIconProps> = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size}>
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
);

export default CloseIcon;
