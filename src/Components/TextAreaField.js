import React from "react";
import { CFormTextarea } from "@coreui/react";
import { useController } from "react-hook-form";
import TextEditor from "./TextEditor";

const TextAreaField = ({ name, ...props }) => {
  const { field, fieldState } = useController({ name, defaultValue: "" });
  const { error } = fieldState;

  const { label, emptyLabel = false, required, ...rest } = props;

  const config = {
    id: `text_area_${name}`,
    key: `text_area_key-${name}`,
    label: label,
    ...field,
    ...rest,
  };

  return (
    <div className="mt-3">
      <CFormTextarea {...config} />
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

export default TextAreaField;
