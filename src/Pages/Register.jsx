import { useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";
import { REGISTERCUSTOMER } from "../Util/ApiUrl";
import { registerInitialValues } from "../Util/initialValues";
import { registerSchema } from "../Util/schema";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import RegisterormFields from "../Components/RegisterFormFileds";

const Register = () => {
  const { loading, post, success, error } = useFetch();
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
    values.hobby = values.hobby.map((v) => "" + v.value);
    values.mobileNumber = values.mobileNumber.map((v) => "" + v.num);
    Object.keys(values).forEach((k, v) => {
      formData.append(k, values[k]);
    });
    post(REGISTERCUSTOMER, formData);
  };
  return (
    <RegisterormFields
      loading={loading}
      formProps={formProps}
      onSubmit={onSubmit}
      success={success}
      error={error}
      title={"Create Your Account"}
    />
  );
};
export default Register;
