import React from 'react';
import { CFormTextarea } from '@coreui/react';
import { useController } from 'react-hook-form';

const TextAreaField = ({ name, ...props }) => {
    const { field, fieldState } = useController({ name, defaultValue: '' });
    const { error } = fieldState;

    const { label, emptyLabel = false, required, ...rest } = props;

    const config = {
        id: `text_area_${name}`,
        key: `text_area_key-${name}`,
        label: label,
        ...field,
        ...rest,
    }

    return (
        <>
            <CFormTextarea {...config} />
            {error?.message ? <span id={`${name}_danger_text`} className="text-danger"><strong>{error.message}</strong></span> : ''}
        </>
    );

};

export default TextAreaField;