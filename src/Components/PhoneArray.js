import React, { useEffect } from "react";
import { CButton, CCol, CRow } from "@coreui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import TextInput from "./TextField";

const PhoneArray = () => {
  const { control, register, setValue } = useFormContext();
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
             
            />
          </CCol>
          <CCol md={2} style={{ marginTop: "1.9rem" }}>
            <CButton color="success" onClick={addNumber}>
              +
            </CButton>
          </CCol>
          {fields.length > 1 && i == 1 && (
            <CCol md={2} style={{ marginTop: "1.9rem", marginLeft: "-4rem" }}>
              <CButton color="danger" onClick={() => removeNumber(i)}>
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
