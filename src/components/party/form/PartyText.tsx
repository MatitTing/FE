import TextInput from '@components/common/TextInput';
import { useFormContext } from 'react-hook-form';
import { Container, Title } from '../FormStyle';

interface PartyTextProps {
    placeholder: string;
    name: string;
    title?: string;
    maxLength?: number;
}

const PartyText = ({ title, placeholder, maxLength = 20, name }: PartyTextProps) => {
    const { register } = useFormContext();

    return (
        <Container>
            {title ? <Title>{title}</Title> : null}
            <TextInput placeholder={placeholder} maxLength={maxLength} {...register(name)} />
        </Container>
    );
};

export default PartyText;
