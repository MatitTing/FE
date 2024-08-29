import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';
import { NewColor } from 'styles/Color';
import { Container, Title } from '../FormStyle';

const TextArea = styled.textarea`
    display: block;
    padding: 10px 14px;
    width: 100%;
    outline: none;
    border: none;
    resize: none;
    border-radius: 5px;
    border: 1px solid ${NewColor.border};
    color: ${NewColor.text_secondary};

    &::placeholder {
        color: ${NewColor.disabled_text};
    }
`;

interface PartyTextAreaProps {
    placeholder: string;
    name: string;
    title?: string;
    maxLength?: number;
    row?: number;
}

const PartyTextArea = ({
    title,
    name,
    placeholder,
    maxLength = 50,
    row = 3,
}: PartyTextAreaProps) => {
    const { register } = useFormContext();

    return (
        <Container>
            {title ? <Title>{title}</Title> : null}
            <TextArea
                placeholder={placeholder}
                maxLength={maxLength}
                rows={row}
                {...register(name)}
            />
        </Container>
    );
};

export default PartyTextArea;
