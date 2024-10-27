import { DefaultButton } from '@components/common/DefaultButton';
import { DefaultText } from '@components/common/DefaultText';
import TextArea from '@components/common/TextArea';
import styled from '@emotion/styled';
import { FC, FormEventHandler } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PartyRequestPopupForm } from './PartyDetailBottomBar';

interface PartyDetailPartyRequestPopupProps {
    closePopup: VoidFunction;
    onSubmit: FormEventHandler;
}

const Container = styled.form`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const TextSection = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`;
const PartyDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px;
    width: 400px;
    background-color: white;
    border-radius: 12px;
`;
const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    background-color: white;
    gap: 10px;
`;

const PartyDetailPartyRequestPopup: FC<PartyDetailPartyRequestPopupProps> = ({
    closePopup,
    onSubmit,
}) => {
    const { register, control } = useFormContext<PartyRequestPopupForm>();
    const oneLineIntroduce = useWatch({ control, name: 'oneLineIntroduce' });

    return (
        <Container onSubmit={onSubmit}>
            <PartyDetailContainer>
                <TextSection>
                    <DefaultText text="파티를 신청하시겠어요?" size={20} weight={700} />
                    <TextArea
                        placeholder="방장에게 한 마디 남겨주세요."
                        {...register('oneLineIntroduce')}
                    />
                </TextSection>
                <ButtonContainer>
                    <DefaultButton
                        text="신청"
                        type="submit"
                        w="100%"
                        disabled={!oneLineIntroduce}
                    />
                    <DefaultButton
                        text="취소"
                        type="button"
                        onClick={closePopup}
                        buttonType="secondary"
                        w="100%"
                    />
                </ButtonContainer>
            </PartyDetailContainer>
        </Container>
    );
};

export default PartyDetailPartyRequestPopup;
