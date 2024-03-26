import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import styled from '@emotion/styled';

const useRipple = <T extends HTMLElement>(ref: React.RefObject<T>, bgColor?: string) => {
    const [ripples, setRipples] = useState<React.CSSProperties[]>([]);
    useEffect(() => {
        if (ref.current) {
            const elem = ref.current;

            const clickHandler = (e: MouseEvent) => {
                const rect = elem.getBoundingClientRect();
                const left = e.clientX - rect.left;
                const top = e.clientY - rect.top;

                const maxSize = Math.max(rect.width, rect.height);

                setRipples([
                    ...ripples,
                    {
                        left: left - maxSize / 2,
                        top: top - maxSize / 2,
                        width: maxSize,
                        height: maxSize,
                    },
                ]);
            };

            elem.addEventListener('click', clickHandler);

            return () => {
                elem.removeEventListener('click', clickHandler);
            };
        }
    }, [ref, ripples]);

    const _debounced = useDebounce(ripples, 1000);

    useEffect(() => {
        if (_debounced.length) setRipples([]);
    }, [_debounced.length]);

    return ripples.map((style, index) => (
        <RippleStyled key={index} style={{ ...style, backgroundColor: bgColor ?? 'white' }} />
    ));
};

export default useRipple;

const RippleStyled = styled.span`
    @keyframes rippleEffect {
        to {
            transform: scale(1.5);
            opacity: 0;
        }
    }
    position: absolute;
    opacity: 30%;
    transform: scale(0);
    animation: rippleEffect 0.5s linear;
    border-radius: 100%;
`;
