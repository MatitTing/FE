import styled from '@emotion/styled';
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import { NewColor } from 'styles/Color';

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 1rem;
    background-color: ${NewColor.primary};
`;

const SubmitButton = styled.button`
    width: 50px;
    border: none;
    color: #fff;
`;

const TextArea = styled.textarea`
    display: flex;
    align-items: center;
    padding: 5px 10px;
    width: 100%;
    font-size: 14px;
    border-radius: 5px;
    color: ${NewColor.text_primary};
    line-height: 1.5;
    outline: none;
    border: none;
    resize: none;
`;

interface ChahFormProps {
    onSubmit: SubmitHandler<FieldValues>;
}

const ChatForm = ({ onSubmit }: ChahFormProps) => {
    const { handleSubmit, register } = useFormContext();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TextArea {...register('message')} rows={1} />
            <SubmitButton type="submit">전송</SubmitButton>
        </Form>
    );
};

export default ChatForm;
