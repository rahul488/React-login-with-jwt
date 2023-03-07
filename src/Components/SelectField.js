import React from "react";
import { CFormInput, CFormSelect } from "@coreui/react";
import { useController } from "react-hook-form";

const SelectField = ({ name, valArr, ...props }) => {
  const { field, fieldState } = useController({ name, defaultValue: "" });
  const { error } = fieldState;

  const { label, emptyLabel = false, required, ...rest } = props;

  const config = {
    id: `select_input_${name}`,
    key: `select_input_key_${name}`,
    type: props.type,
    label: label,
    ...field,
    ...rest,
  };

  return (
    <>
      <CFormSelect {...config}>
      <option label={'Select'} value={''} />
        {valArr.map((op, i) => (
          <option label={op.label} value={op.value} key={i} />
        ))}
      </CFormSelect>
      {error?.message ? (
        <span id={`${name}_danger_text`} className="text-danger">
          <strong>{error.message}</strong>
        </span>
      ) : (
        ""
      )}
    </>
  );
};

export default SelectField;