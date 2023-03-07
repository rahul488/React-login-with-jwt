import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { GETCUSTOMERDETAILS } from "../Util/ApiUrl";

const GenerateInitialValue = (Component) => {
  const InitialValueProvider = (props) => {
    const [initialvalue, setinitialvalue] = useState(undefined);
    const { data, get } = useFetch();
    const param = useParams();

    useEffect(() => {
      get(GETCUSTOMERDETAILS + `${param.id}`);
    }, [param.id]);

    useEffect(() => {
      if (data) {
        setInitialFieldValues();
      }
    }, [data]);

    const setInitialFieldValues = () => {
      let mobileNumber = [];
      data.mobileNumber.map((v) => {
        mobileNumber.push({ num: v });
      });
      setinitialvalue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: "",
        confirmPassword: "",
        gender: data.gender,
        age: data.age,
        mobileNumber: mobileNumber,
        profile: "",
        address: data.address,
        maritalStatus: data.maritalStatus,
        hobby: [],
        termAndCondition: data.termAndConditions,
      });
    };

    return <Component {...props} initialvalue={initialvalue} />;
  };
  return InitialValueProvider;
};
export default GenerateInitialValue;