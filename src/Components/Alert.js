import { CAlert } from "@coreui/react";

const Alert = ({ success = false, error = false }) => {
  return (
    <>
      {success && (
        <CAlert color="success" className="d-flex align-items-center" dismissible
        onClose ={()=>{}}>
          You are good to go now!
        </CAlert>
      )}
      {error && (
        <CAlert color="danger" className="d-flex align-items-center"   dismissible
        onClose ={()=>{}}>
          Something went wrong!
        </CAlert>
      )}
    </>
  );
};
export default Alert;
