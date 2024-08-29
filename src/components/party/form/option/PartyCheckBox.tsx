import { OtionLable } from '@components/party/FormStyle';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface PartyCheckBoxProps {
    formId: string;
    contents: { name: string; value: string }[];
}

const PartyCheckBox = ({ formId, contents }: PartyCheckBoxProps) => {
    const { setValue, watch } = useFormContext();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(formId, e.target.value);

    return contents.map(({ name, value }) => (
        <OtionLable key={name + value} htmlFor={name + value} isActive={watch(formId) === value}>
            {name}
            <input
                id={name + value}
                value={value}
                type="checkbox"
                name={formId}
                onChange={handleChange}
                hidden
            />
        </OtionLable>
    ));
};

export default PartyCheckBox;
