import { CAlert } from "@coreui/react";

const Alert = ({ success = false, error = false, message = "" }) => {
  return (
    <>
      {success && (
        <CAlert
          color="success"
          className="d-flex align-items-center"
          dismissible
          onClose={() => {}}
        >
          {message && message.length ? message : "You are good to go now"}
        </CAlert>
      )}
      {error && (
        <CAlert
          color="danger"
          className="d-flex align-items-center"
          dismissible
          onClose={() => {}}
        >
          {message && message.length ? message : "Something went wrong"}
        </CAlert>
      )}
    </>
  );
};
export default Alert;
