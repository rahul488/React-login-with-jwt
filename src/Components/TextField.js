import React from 'react';
import { CFormInput } from '@coreui/react';
import { useController } from 'react-hook-form';

const TextInput = ({ name, ...props }) => {
    const { field, fieldState } = useController({ name, defaultValue: '' });
    const { error } = fieldState;

    const { label, emptyLabel = false, required, ...rest } = props;

    const config = {
        id: `text_input_${name}`,
        key: `text_input_key-${name}`,
        type: props.type,
        label: label,
        ...field,
        ...rest,
    }

    return (
        <>
            <CFormInput {...config} />
            {error?.message ? <span id={`${name}_danger_text`} className="text-danger"><strong>{error.message}</strong></span> : ''}
        </>
    );

};

export default TextInput;