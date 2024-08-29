import { ChangeEventHandler, FC, PropsWithChildren } from 'react';
import PartyForm from './PartyForm';
import { useRouter } from 'next/router';
import { Submit, Wrapper } from './FormStyle';
import { useFormContext } from 'react-hook-form';

interface CreateProps {
    onChangeThumbnail: ChangeEventHandler<HTMLInputElement>;
}

const Create: FC<PropsWithChildren<CreateProps>> = ({ onChangeThumbnail }) => {
    const router = useRouter();
    const { id: partyId } = router.query as { id: string };
    const { formState } = useFormContext();

    return (
        <Wrapper>
            <PartyForm.Text name="partyTitle" placeholder="모집 글제목" />
            <PartyForm.TextArea name="partyContent" placeholder="모집 내용" />
            <PartyForm.Search />
            <PartyForm.Map />
            <PartyForm.Text name="menu" placeholder="메뉴 입력" />
            <PartyForm.Option id="category" />
            <PartyForm.Option id="totalParticipant" />
            <PartyForm.Option id="gender" />
            <PartyForm.Option id="age" />
            {partyId ? <PartyForm.Option id="status" /> : null}
            <PartyForm.Date title="날짜" name="partyTime" />
            <PartyForm.Thumbnail onChangeThumbnail={onChangeThumbnail} />
            <Submit type="submit" disabled={!formState.isValid}>
                완료
            </Submit>
        </Wrapper>
    );
};

export default Create;
