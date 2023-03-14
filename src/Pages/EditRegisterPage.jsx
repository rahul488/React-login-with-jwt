import { useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";
import { UPDATECUSTOMER } from "../Util/ApiUrl";
import { registerSchema } from "../Util/schema";
import { useNavigate, useParams } from "react-router";
import RegisterormFields from "../Components/RegisterFormFileds";
import GenerateInitialValue from "../Hoc/GenerateInitialValue";
import { CSpinner } from "@coreui/react";

export const EditResgister = ({
  initialvalue,
  disabled,
  handleEdit,
  title,
}) => {
  const { loading, success, error, put, get } = useFetch();
  const param = useParams();
  const navigate = useNavigate();
  const formProps = useForm({
    mode: "all",
    resolver: registerSchema,
    defaultValues: initialvalue,
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    values.hobby = values.hobby.map((v) => "" + v.value);
    values.mobileNumber = values.mobileNumber.map((v) => "" + v.num);
    Object.keys(values).forEach((k, v) => {
      formData.append(k, values[k]);
    });
    put(UPDATECUSTOMER + `${param.id}`, formData);
    handleEdit();
  };
  return (
    <RegisterormFields
      loading={loading}
      formProps={formProps}
      onSubmit={onSubmit}
      success={success}
      error={error}
      disabled={disabled}
      handleEdit={handleEdit}
      title={title}
    />
  );
};

const EditResgisterWrapper = ({
  initialvalue,
  disabled = "false",
  handleEdit,
  title,
}) => {
  return (
    <>
      {initialvalue ? (
        <EditResgister
          initialvalue={initialvalue}
          disabled={disabled}
          handleEdit={handleEdit}
          title={title}
        />
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      )}
    </>
  );
};
export default GenerateInitialValue(EditResgisterWrapper);
