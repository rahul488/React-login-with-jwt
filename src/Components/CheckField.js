import React, { useRef, useState } from 'react';
import { CFormCheck } from '@coreui/react';
import { useController, useFormContext } from 'react-hook-form';

const CheckField = ({ name, ...props }) => {
    const { field, fieldState } = useController({ name, defaultValue: '' });
    const { register, setValue } = useFormContext();
    const { error } = fieldState;
    const checkedRef = useRef();

    const { label, emptyLabel = false, required, ...rest } = props;

    const config = {
        id: `check_field_${name}`,
        key: `check_field_key-${name}`,
        label: label,
        ...field,
        ...rest,
    }

    const handleClick = (e) => {
        setValue(name,e.target.checked,{shouldValidate:true})
        checkedRef.current = e.target.checked;
    }

    return (
        <div className="mt-3">
            <CFormCheck {...config} onClick={(e)=>handleClick(e)} value={checkedRef.current?.value}  {...register(name)} />
            {error?.message ? <span id={`${name}_danger_text`} className="text-danger"><strong>{error.message}</strong></span> : ''}
        </div>
    );

};

export default CheckField;