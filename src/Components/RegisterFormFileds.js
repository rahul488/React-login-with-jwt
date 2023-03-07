import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
  CSpinner,
} from "@coreui/react";
import { FormProvider } from "react-hook-form";
import CheckField from "./CheckField";
import FileInput from "./FileInput";
import PhoneArray from "./PhoneArray";
import ProfileImage from "./ProfileImage";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import TextInput from "./TextField";
import Alert from "./Alert";

const RegisterormFields = ({
  loading,
  intialLoading,
  formProps,
  onSubmit,
  success,
  error,
}) => {
  const tAndCEnabled = formProps.watch("termAndCondition");

  return (
    <CContainer className="p-4">
      {loading || intialLoading ? (
        <>
          <div className="d-flex justify-content-center align-items-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        </>
      ) : (
        <CRow>
          <CCol md={6} className="d-flex justify-content-center w-100 mt-3">
            <CCard style={{ width: "720px" }} className="register-wrapper">
              <FormProvider {...formProps}>
                <form onSubmit={formProps.handleSubmit(onSubmit)}>
                  <Alert success={success} error={error} />
                  <CCardTitle className="text-center mt-3">Register</CCardTitle>
                  <CCardBody>
                    <CRow>
                      <CCol md={12} className="text-center">
                        <ProfileImage />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="firstName"
                          type="text"
                          label="First Name"
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="lastName"
                          type="text"
                          label="Last Name"
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="email"
                          type="text"
                          label="Email"
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="age"
                          type="number"
                          label="Age"
                          min={18}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="password"
                          type="password"
                          label="Password"
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="confirmPassword"
                          type="password"
                          label="Confirm Password"
                          required
                        />
                      </CCol>
                      <CCol md={12}>
                        <PhoneArray />
                      </CCol>
                      <CCol md={6}>
                        <FileInput
                          type="file"
                          name="profile"
                          label="Enter your photo"
                        />
                      </CCol>
                      <CCol md={6}>
                        <SelectField
                          name="maritalStatus"
                          type="select"
                          label="Marital Status"
                          valArr={[
                            { label: "Single", value: "single" },
                            { label: "Married", value: "married" },
                          ]}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <RadioField
                          name="gender"
                          type="radio"
                          label="Gender"
                          valArr={["Male", "Female"]}
                          required
                        />
                      </CCol>
                      {/* <CCol md={6}>
                          <Multiselect
                            name="hobby"
                            label="Hobby"
                            options={[{id:'sing',value:'singing',label:'Singing'},{id:'playing',value:'playing',label:'Play Cricket'},{id:'dance',value:'dance',label:'Dance'},{id:'watching',value:'watching tv',label:'watching tv'}]}
                            required
                          />
                        </CCol> */}
                      <CCol md={12}>
                        <TextAreaField
                          name="address"
                          row={5}
                          label="Enter your address"
                          placeholder="Maximum 150 characters allowed"
                          required
                        />
                      </CCol>
                      <CCol md={12}>
                        <CheckField
                          name="termAndCondition"
                          label="Accept T&c"
                          required
                        />
                      </CCol>
                      <CCol md={12} className="mt-3">
                        <CButton
                          type="submit"
                          color="primary"
                          disabled={!tAndCEnabled}
                        >
                          Submit
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </form>
              </FormProvider>
            </CCard>
          </CCol>
        </CRow>
      )}
    </CContainer>
  );
};
export default RegisterormFields;
