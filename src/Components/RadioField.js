import { CFormCheck, CFormLabel } from "@coreui/react";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

const RadioField = ({ name, ...props }) => {
  const { field, fieldState } = useController({ name, defaultValue: "" });
  const { register } = useFormContext();
  const { error } = fieldState;

  const { label, emptyLabel = false, required, valArr, ...rest } = props;

  const config = {
    id: `radio_input_${name}`,
    key: `radio_input_key-${name}`,
    type: props.type,
    ...field,
    ...rest,
  };

  return (
    <div className="mt-3">
      <CFormLabel>{label}</CFormLabel>
      <div className="d-flex gap-2">
      {valArr.map((v,i) => (
        <CFormCheck {...config} key={i} value={v} id={`radio_input_${i}_${name}`} label={v} {...register('gender')} />
      ))}
      </div>
      {error?.message ? (
        <span id={`${name}_danger_text`} className="text-danger">
          <strong>{error.message}</strong>
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
export default RadioField;
