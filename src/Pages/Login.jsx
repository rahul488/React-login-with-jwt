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
import { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import TextInput from "../Components/TextField";
import { AuthContext } from "../Conext/AuthContext";
import useFetch from "../hooks/useFetch";
import { LOGINCUSTOMER } from "../Util/ApiUrl";
import { loginIntialValues } from "../Util/initialValues";
import { loginSchema } from "../Util/schema";

const Login = () => {
  const { data, loading, post, success, error } = useFetch();
  const formProps = useForm({
    mode: "all",
    resolver: loginSchema,
    defaultValues: loginIntialValues,
  });
  const navigate = useNavigate();
  const { setLogin, saveTokenInLocalStorage } = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      saveTokenInLocalStorage(data);
      let url = `/dashboard`;
      setLogin(true);
      navigate(url);
    }
  }, [data]);

  const onSubmit = async (values) => {
    const payload = {
      userName: values.email,
      password: values.password,
    };
    post(LOGINCUSTOMER, payload);
  };

  return (
    <CContainer>
      <CRow>
        <CCol md={6} className="d-flex justify-content-center w-100 mt-3">
          {loading ? (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <CSpinner color="primary" variant="grow" />
              </div>
            </>
          ) : (
            <CCard style={{ width: "400px" }} className="login-wrapper">
              <FormProvider {...formProps}>
                <form onSubmit={formProps.handleSubmit(onSubmit)}>
                  <Alert success={success} error={error} />
                  <CCardTitle className="text-center mt-3">Login</CCardTitle>
                  <CCardBody>
                    <CRow>
                      <CCol md={12}>
                        <TextInput
                          name="email"
                          type="text"
                          label="Email"
                          required
                        />
                      </CCol>
                      <CCol md={12}>
                        <TextInput
                          name="password"
                          type="password"
                          label="Password"
                          required
                        />
                      </CCol>
                      <CCol md={12} className="mt-3 d-flex flex-column">
                        <CButton type="submit" color="primary">
                          Submit
                        </CButton>
                        <Link to="/register" className="text-center mt-2">
                          Register
                        </Link>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </form>
              </FormProvider>
            </CCard>
          )}
        </CCol>
      </CRow>
    </CContainer>
  );
};
export default Login;
