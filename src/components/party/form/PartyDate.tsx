import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';
import { NewColor } from 'styles/Color';
import { Container, Title } from '../FormStyle';

const DatePicker = styled.input`
    width: 100%;
    height: 50px;
    border: 1px solid ${NewColor.border};
    border-radius: 8px;
    display: flex;
    padding: 15px;
    color: ${NewColor.text_secondary};
`;

interface PartyDateProps {
    name: string;
    title?: string;
}

const PartyDate = ({ name, title }: PartyDateProps) => {
    const { register } = useFormContext();

    return (
        <Container>
            {title ? <Title>{title}</Title> : null}
            <DatePicker type="datetime-local" {...register(name)} />
        </Container>
    );
};

export default PartyDate;
