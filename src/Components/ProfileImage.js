import { CAvatar } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";

const ProfileImage = ({ url }) => {
  // const [image, setImage] = useState(null);
  // const { field, fieldState } = useController({ name: "profile" });

  // useEffect(() => {
  //   if (fieldState.error) {
  //     setImage(null);
  //   } else if (field.value) {
  //     convertToBase64(field.value);
  //   }
  // }, [field.value, fieldState]);

  // const convertToBase64 = (file) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImage(reader.result.toString());
  //   };
  //   reader.readAsDataURL(file);
  // };

  return (
    <>
      <img src={url} height={200} width={200} style={{ borderRadius: "50%" }} />
    </>
  );
};
export default ProfileImage;
