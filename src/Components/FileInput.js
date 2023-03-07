import React, { useRef } from 'react';
import { CFormInput } from '@coreui/react';
import { useController, useForm, useFormContext } from 'react-hook-form';

const FileInput = ({ name, ...props }) => {
    const { field, fieldState } = useController({ name, defaultValue: '' });
    const { error } = fieldState;
    const { setValue } = useFormContext();
    const profileRef = useRef('');

    const { label, emptyLabel = false, required, ...rest } = props;

    const config = {
        id: `file_input_${name}`,
        key: `file_input_key-${name}`,
        type: props.type,
        label,
        ...field,
        ...rest,
    }

    const handleChange = (e) => {
        setValue('profile',e.target.files[0],{shouldValidate:true})
        profileRef.current=e.target.files[0];
    }

    return (
        <>
            <CFormInput {...config} onChange={handleChange} value={profileRef.current?.value}/>
            {error?.message ? <span id={`${name}_danger_text`} className="text-danger"><strong>{error.message}</strong></span> : ''}
        </>
    );

};

export default FileInput;