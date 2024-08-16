import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { NewColor } from 'styles/Color';

interface RecentTimeProps {
    time: string;
}

const Time = styled.p<{ color?: string; fontSize?: string }>`
    color: ${({ color }) => (color ? color : NewColor.text_secondary)};
    font-size: ${({ fontSize }) => (fontSize ? fontSize : '12px')};
`;

const RecentTime = ({ time, ...props }: RecentTimeProps) => {
    return time ? <Time {...props}>{displayTime(time)}</Time> : null;
};

export default RecentTime;

export const displayTime = (time: string) => {
    const lastMessageTime = dayjs(time).format('YYYY.MM.DD');
    const currentTime = dayjs().format('YYYY.MM.DD');

    if (lastMessageTime === currentTime) {
        return dayjs(time).format('HH:mm');
    }

    return dayjs(time).format('YYYY.MM.DD');
};
