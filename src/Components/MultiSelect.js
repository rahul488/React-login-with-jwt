import React from "react";
import { CFormLabel } from "@coreui/react";
import {
  useController,
} from "react-hook-form";
import Select from "react-select";

const Multiselect = ({ name, options, ...props }) => {
  const { field, fieldState } = useController({ name, defaultValue: "" });
  const { error } = fieldState;
  const { label, emptyLabel = false, required, ...rest } = props;
  const {
    value: selectValue,
    onChange: handleChange,
    onBlur,
    ...restFieldProps
  } = field;

  const config = {
    id: `multi_select_input_${name}`,
    key: `multi_select_input_key_${name}`,
    label: label,
    ...field,
    ...rest,
  };

  return (
    <div className="mt-3">
      <CFormLabel>{label}</CFormLabel>
      <Select
        isMulti
        className="react-basic-select"
        options={options}
        value={
          selectValue
            ? options.find((v) => v.value === selectValue)
            : selectValue
        }
        onChange={(option) =>
          handleChange(option ? option.map((op) => op.value) : option)
        }
        {...restFieldProps}
        {...config}
      />
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

export default Multiselect;
