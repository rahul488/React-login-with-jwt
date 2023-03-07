import { useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";
import { REGISTERCUSTOMER, UPDATECUSTOMER } from "../Util/ApiUrl";
import { registerInitialValues } from "../Util/initialValues";
import { registerSchema } from "../Util/schema";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import RegisterormFields from "../Components/RegisterFormFileds";

const Register = () => {
  const { data, loading, post, success, error, put } = useFetch();
  const param = useParams();
  const {
    data: customerData,
    loading: intialLoading,
    get: getCustomerData,
  } = useFetch();
  const navigate = useNavigate();
  const formProps = useForm({
    mode: "all",
    resolver: registerSchema,
    defaultValues: registerInitialValues,
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, [1000]);
    }
  }, [success]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    values.mobileNumber = values.mobileNumber.map((v) => "" + v.num);
    Object.keys(values).forEach((k, v) => {
      formData.append(k, values[k]);
    });
    if (param?.id) {
      put(UPDATECUSTOMER + `${param.id}`, formData);
    } else {
      post(REGISTERCUSTOMER, formData);
    }
  };
  return (
    <RegisterormFields
      loading={loading}
      intialLoading={intialLoading}
      formProps={formProps}
      onSubmit={onSubmit}
      success={success}
      error={error}
    />
  );
};
export default Register;
