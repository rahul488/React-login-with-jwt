import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { GETPROFILEIMAGE } from "../Util/ApiUrl";

const ProfileImage = ({ id }) => {
  const [image, setImage] = useState(null);
  const { field, fieldState } = useController({ name: "profile" });

  useEffect(() => {
    if (fieldState.error) {
      setImage(null);
    } else if (field.value) {
      convertToBase64(field.value);
    }
  }, [field.value, fieldState]);

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.toString());
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {image ? (
        <img
          src={image}
          height={200}
          width={200}
          style={{ borderRadius: "50%" }}
        />
      ) : id != undefined ? (
        <img
          src={GETPROFILEIMAGE + `${id}`}
          height={200}
          width={200}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default ProfileImage;
