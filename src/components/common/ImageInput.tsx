import EditIcon from '@components/icons/common/Edit.icon';
import styled from '@emotion/styled';
import { ChangeEventHandler, FC, useCallback } from 'react';

interface ImageInputProps {}

const Container = styled.label`
    width: 100%;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc((100vw - 40px - 20px) / 5);
    min-width: calc((100vw - 40px - 20px) / 5);
    height: calc((100vw - 40px - 20px) / 5);
    border: 1px dashed #bcbcbc;
    border-radius: 15px;
    input {
        display: none;
    }
`;

const Wrapper = styled.div`
    display: flex;
    column-gap: 5px;
    width: max-content;
    padding: 0 20px;
`;

const ImageInput: FC<ImageInputProps> = () => {
    const onChangeImageInput = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
        console.log(event);
    }, []);

    return (
        <Container>
            <EditIcon />
            <input type="file" accept="image/*" multiple onChange={onChangeImageInput} />
        </Container>
    );
};

export default ImageInput;
