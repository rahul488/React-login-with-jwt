import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const loginSchema = yupResolver(
  Yup.object().shape({
    email: Yup.string()
      .nullable()
      .required("This field is required")
      .email("Invalid email")
      .required("This field is required"),
    password: Yup.string()
      .nullable()
      .required("This field is required")
      .matches(
        /^.*(?=.{5,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 5 characters, one uppercase, one number and one special case character"
      ),
  })
);

export const registerSchema = yupResolver(
  Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .nullable()
      .required("This field is required"),
    lastName: Yup.string().trim().nullable().required("This field is required"),
    email: Yup.string()
      .nullable()
      .required("This field is required")
      .email("Invalid email")
      .required("This field is required"),
    age: Yup.number()
      .nullable()
      .typeError("This field is required")
      .min(18, "Minimum age must be ${min}")
      .required("This field is required"),
    password: Yup.string()
      .nullable()
      .required("This field is required")
      .matches(
        /^.*(?=.{5,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 5 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: Yup.string()
      .nullable()
      .required("This field is required")
      .oneOf([Yup.ref("password"), null], "Password is not same"),
    gender: Yup.string().nullable().required("This field is required"),
    hobby: Yup.array()
      .min(1, "This field is required")
      .of(
        Yup.object().shape({
          label: Yup.string().required("This field is required"),
          value: Yup.string().required("This field is required"),
        })
      ),
    mobileNumber: Yup.array().of(
      Yup.object().shape({
        num: Yup.number()
          .nullable()
          .typeError("This field is required")
          .min(1, "Negative number not allowed")
          .test("valid number", function (value) {
            if (value.toString().length != 10) {
              return this.createError({
                message: "Number should be 10 digits length",
              });
            } else {
              return true;
            }
          }),
      })
    ),
    profile: Yup.mixed()
      .nullable()
      .required("This field is required")
      .test("format", function (value) {
        if (value.type === "image/jpeg" || value.type === "image/png") {
          return true;
        } else {
          return this.createError({
            message: "Unsupported file type",
            path: "profile",
          });
        }
      }),
    maritalStatus: Yup.string()
      .nullable()
      .typeError("This field is required")
      .required("This field is required"),
    address: Yup.string()
      .test("maxLength", function (value) {
        if (value.toString().length > 150) {
          return this.createError({
            message: `You reached the limit of 150 characters`,
            path: "address",
          });
        } else {
          return true;
        }
      })
      .nullable()
      .required("This field is required"),
    termAndCondition: Yup.bool()
      .nullable()
      .typeError("This field is required")
      .test("acceptance check", function (value) {
        if (!value) {
          return this.createError({
            message: "Please accept T&C",
            path: "termAndCondition",
          });
        } else {
          return true;
        }
      })
      .required("This field is required"),
  })
);
