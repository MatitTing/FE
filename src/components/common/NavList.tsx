import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { BottomIconProps } from 'types/layout';
import Link from 'next/link';
import { NewColor } from 'styles/Color';
interface NavListProps {
    item: {
        title: string;
        href: string;
        icon: ({ selected }: BottomIconProps) => JSX.Element;
        query?: {
            [key: string]: string;
        };
    };
}

const Container = styled.div<{ isSelected: boolean }>`
    width: 100%;
    max-width: calc(100% / 5) px;
    height: 100%;
    max-height: calc(100% / 5) px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border-radius: 8px;
    transition: all 0.1s;
    cursor: pointer;

    svg {
        fill: ${({ isSelected }) => (isSelected ? NewColor.primary : NewColor.dark)};
    }
`;

const TitleText = styled.span<{ isSelected: boolean }>`
    color: ${({ isSelected }) => (isSelected ? NewColor.primary : NewColor.dark)};
    font-size: 12px;
`;

const NavList = ({ item }: NavListProps) => {
    const { title, href, icon, query } = item;
    const router = useRouter();
    const selected = router.pathname === href;

    return (
        <Link href={{ pathname: href, query: query }}>
            <Container isSelected={selected}>
                {icon({ selected })}
                <TitleText isSelected={selected}>{title}</TitleText>
            </Container>
        </Link>
    );
};

export default NavList;
