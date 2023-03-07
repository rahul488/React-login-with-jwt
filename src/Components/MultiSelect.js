import React, { useContext } from "react";
import { CFormLabel } from "@coreui/react";
import { useController } from "react-hook-form";
import Select from 'react-select'


const Multiselect = ({ name, options, ...props }) => {
  const { field, fieldState } = useController({ name, defaultValue: "" });
  const { error } = fieldState;

  const { label, emptyLabel = false, required, ...rest } = props;

  const config = {
    id: `multi_select_input_${name}`,
    key: `multi_select_input_key_${name}`,
    label: label,
    ...field,
    ...rest,
  };

  return (
    <>
    <CFormLabel>{label}</CFormLabel>
     <Select isMulti className="basic-multi-select" options={options} {...config}/>
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

export default Multiselect;
