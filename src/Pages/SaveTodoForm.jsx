import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { FormProvider } from "react-hook-form";
import TextInput from "../Components/TextField";
import useFetch from "../hooks/useFetch";
import { SAVETODO } from "../Util/ApiUrl";

const SaveTodoForm = ({ modal, setModal, handleModal, formProps }) => {
  const { post: SaveTodos, loading } = useFetch();
  const closeModal = () => {
    formProps.resetField("todoName", "");
    setModal(false);
  };
  const onSubmit = async (values) => {
    const payload = {
      todoName: values.todoName,
      status: "todo",
    };
    SaveTodos(SAVETODO, payload);
  };
  return (
    <CModal visible={modal} alignment="center" onClose={closeModal}>
      <CModalHeader>
        <CModalTitle>Add Your Todo</CModalTitle>
      </CModalHeader>
      <FormProvider {...formProps}>
        <form onSubmit={formProps.handleSubmit(onSubmit)}>
          <CModalBody>
            <CRow>
              <CCol md={12}>
                <TextInput
                  name="todoName"
                  type="text"
                  label="Enter Todo Name"
                  placeholder="Todo Name"
                  required
                />
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={closeModal}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Save
            </CButton>
          </CModalFooter>
        </form>
      </FormProvider>
    </CModal>
  );
};
export default SaveTodoForm;
