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
import Multiselect from "./MultiSelect";
import { hobbyOptions } from "../Util/initialValues";
import { useParams } from "react-router";

const RegisterormFields = ({
  loading,
  formProps,
  onSubmit,
  success,
  error,
  title,
  disabled = false,
  handleEdit,
}) => {
  const param = useParams();
  const tAndCEnabled = formProps.watch("termAndCondition");
  return (
    <CContainer className="p-4">
      {loading ? (
        <>
          <div className="d-flex justify-content-center align-items-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        </>
      ) : (
        <CRow>
          <CCol md={6} className="d-flex justify-content-center w-100 mt-3">
            <CCard className="register-wrapper">
              <FormProvider {...formProps}>
                <form onSubmit={formProps.handleSubmit(onSubmit)}>
                  <Alert success={success} error={error} />
                  <CCardTitle className="text-center mt-3">{title}</CCardTitle>
                  <CCardBody>
                    <CRow>
                      <CCol md={12} className="text-center mt-3">
                        <ProfileImage id={param?.id} />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="firstName"
                          type="text"
                          label="First Name"
                          placeholder="Enter Your First Name"
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="lastName"
                          type="text"
                          label="Last Name"
                          placeholder="Enter Your Last Name"
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="email"
                          type="text"
                          label="Email"
                          placeholder="Enter Your Email"
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="age"
                          type="number"
                          label="Age"
                          min={18}
                          placeholder="Enter Your age"
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="password"
                          type="password"
                          label="Password"
                          placeholder="Enter Your Password"
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <TextInput
                          name="confirmPassword"
                          type="password"
                          label="Confirm Password"
                          placeholder="Conform Your Password"
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={12}>
                        <PhoneArray disabled={disabled} />
                      </CCol>
                      <CCol md={6}>
                        <FileInput
                          type="file"
                          name="profile"
                          label="Enter your photo"
                          placeholder="Enter Your Profile"
                          disabled={disabled}
                        />
                      </CCol>
                      <CCol md={6}>
                        <SelectField
                          name="maritalStatus"
                          type="select"
                          label="Marital Status"
                          placeholder="Enter Your Marital Status"
                          valArr={[
                            { label: "Single", value: "single" },
                            { label: "Married", value: "married" },
                          ]}
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <RadioField
                          name="gender"
                          type="radio"
                          label="Gender"
                          valArr={["Male", "Female"]}
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <Multiselect
                          name="hobby"
                          label="Hobby"
                          options={hobbyOptions}
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={12}>
                        <TextAreaField
                          name="address"
                          row={5}
                          label="Enter your address"
                          placeholder="Maximum 150 characters allowed"
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={12}>
                        <CheckField
                          name="termAndCondition"
                          label="Accept T&c"
                          disabled={disabled}
                          required
                        />
                      </CCol>
                      <CCol md={12} className="mt-3">
                        <CButton
                          type="submit"
                          color="primary"
                          disabled={!tAndCEnabled || disabled}
                        >
                          Submit
                        </CButton>
                        {disabled && (
                          <CButton
                            color="warning"
                            style={{ marginLeft: "10px" }}
                            disabled={!disabled}
                            onClick={handleEdit}
                          >
                            Edit
                          </CButton>
                        )}
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
