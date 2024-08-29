import { OtionLable } from '@components/party/FormStyle';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface PartyRadioProps {
    formId: string;
    contents: { name: string; value: string | number }[];
}

const PartyRadio = ({ formId, contents }: PartyRadioProps) => {
    const { setValue, watch } = useFormContext();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(formId, e.target.value);

    return contents.map(({ name, value }) => (
        <OtionLable
            key={name + value}
            htmlFor={name}
            isActive={String(watch(formId)) === String(value)}
        >
            {name}
            <input
                id={name}
                value={value}
                type="radio"
                name={formId}
                onChange={handleChange}
                hidden
            />
        </OtionLable>
    ));
};

export default PartyRadio;
