import React from "react";
import { CButton, CCol, CRow } from "@coreui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import TextInput from "./TextField";

const PhoneArray = ({ disabled }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "mobileNumber",
    control,
  });

  const addNumber = () => {
    if (fields.length < 2) {
      append({ name: "num" });
    }
  };
  const removeNumber = (index) => {
    remove(index);
  };

  return (
    <CRow>
      {fields.map((f, i) => (
        <React.Fragment key={i}>
          <CCol md={6}>
            <TextInput
              name={`mobileNumber.${i}.num`}
              label={`Phone${i + 1}`}
              type="number"
              disabled={disabled}
            />
          </CCol>
          <CCol md={2} style={{ marginTop: "3rem" }}>
            <CButton color="success" onClick={addNumber} disabled={disabled}>
              +
            </CButton>
          </CCol>
          {fields.length > 1 && i == 1 && (
            <CCol md={2} style={{ marginTop: "3rem", marginLeft: "-10rem" }}>
              <CButton
                color="danger"
                onClick={() => removeNumber(i)}
                disabled={disabled}
              >
                -
              </CButton>
            </CCol>
          )}
        </React.Fragment>
      ))}
    </CRow>
  );
};
export default PhoneArray;
