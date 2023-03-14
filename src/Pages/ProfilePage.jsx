import { useEffect, useState } from "react";
import EditResgisterWrapper from "./EditRegisterPage";

const ProfilePage = () => {
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("Your Account Info");

  useEffect(() => {
    if (disabled) {
      setTitle("Your Account Info");
    } else {
      setTitle("Update Your Account");
    }
  }, [disabled]);

  const handleEdit = () => {
    setDisabled(!disabled);
  };

  return (
    <EditResgisterWrapper
      disabled={disabled}
      handleEdit={handleEdit}
      title={title}
    />
  );
};
export default ProfilePage;
