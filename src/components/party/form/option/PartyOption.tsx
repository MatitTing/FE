import { Container, OptionGroup, Title } from '@components/party/FormStyle';
import PartyCheckBox from './PartyCheckBox';
import PartyRadio from './PartyRadio';
import {
    PARTY_AGE_LABEL,
    PARTY_CATEGORY_LABEL,
    PARTY_GENDER_LABEL,
    PARTY_STATUS_LABEL,
    PARTY_TOTAL_LABEL,
} from 'src/constants/options';

type optionType = {
    formId: string;
    title: string;
    contents: { name: string; value: string }[];
    type: 'radio' | 'checkbox';
};

const OPTION_LIST = [
    { formId: 'category', title: '카테고리', contents: PARTY_CATEGORY_LABEL, type: 'radio' },
    { formId: 'totalParticipant', title: '모집인원', contents: PARTY_TOTAL_LABEL, type: 'radio' },
    { formId: 'gender', title: '성별', contents: PARTY_GENDER_LABEL, type: 'radio' },
    { formId: 'age', title: '연령', contents: PARTY_AGE_LABEL, type: 'checkbox' },
    { formId: 'status', title: '파티상태', contents: PARTY_STATUS_LABEL, type: 'radio' },
] as optionType[];

interface PPartyOptionProps {
    id: string;
}

const PartyOption = ({ id }: PPartyOptionProps) => {
    const option = OPTION_LIST.find(({ formId }) => formId == id);

    return (
        option && (
            <Container>
                <Title>{option?.title}</Title>
                <OptionGroup>
                    {option?.type === 'radio' ? (
                        <PartyRadio formId={option?.formId} contents={option?.contents} />
                    ) : (
                        <PartyCheckBox formId={option?.formId} contents={option?.contents} />
                    )}
                </OptionGroup>
            </Container>
        )
    );
};

export default PartyOption;
