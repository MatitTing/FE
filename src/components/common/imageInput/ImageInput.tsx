import EditIcon from '@components/icons/common/Edit.icon';
import styled from '@emotion/styled';
import useToast from '@hooks/useToast';
import { ChangeEventHandler, FC, useCallback } from 'react';
import ImageInputTile from './ImageInputTile';

export interface ImageInputValue {
    id: string;
    src: File | string;
}

interface ImageInputProps {
    value: ImageInputValue[];
    onChange: (value: ImageInputValue[]) => void;
    maxLength: number;
}

const Container = styled.label`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90px;
    min-width: 90px;
    height: 90px;
    border: 1px dashed #bcbcbc;
    border-radius: 15px;
    cursor: pointer;
    input {
        display: none;
    }
`;

const Wrapper = styled.div`
    display: flex;
    gap: 15px;
    width: max-content;
    padding: 15px 20px;
`;

const ImageInput: FC<ImageInputProps> = ({ value, maxLength, onChange }) => {
    const { showToast } = useToast();
    const onChangeImageInput = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const { files } = event.currentTarget;
            if (!files) return;
            let sizeError = false;
            const result: ImageInputValue[] = [];
            for (let i = 0; i < files.length; i += 1) {
                if (i + value.length > maxLength - 1) {
                    showToast('최대 등록 사진 개수 초과입니다.');
                    break;
                }

                const file = files.item(i);

                if (file) {
                    if (file.size <= 104857600) {
                        result.unshift({
                            id: crypto.randomUUID(),
                            src: file,
                        });
                    } else {
                        sizeError = true;
                    }
                }
            }

            onChange([...result, ...value]);
            event.currentTarget.value = '';

            if (sizeError) {
                showToast('사진이 100MB 제한을 초과했어요.');
            }
        },
        [maxLength, onChange, showToast, value],
    );

    return (
        <Wrapper>
            {value.length < maxLength ? (
                <Container>
                    <EditIcon />
                    <input type="file" accept="image/*" multiple onChange={onChangeImageInput} />
                </Container>
            ) : null}
        </Wrapper>
    );
};

export default ImageInput;
