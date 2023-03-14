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
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SelectField from "../Components/SelectField";
import TextInput from "../Components/TextField";
import { todoInitialValues } from "../Util/initialValues";
import { todoSchema } from "../Util/schema";

const TodoForm = ({
  modal,
  setModal,
  saveTodo,
  todoDetails,
  updateTodo,
  title,
}) => {
  const formProps = useForm({
    mode: "all",
    resolver: todoSchema,
    defaultValues: todoInitialValues,
  });

  useEffect(() => {
    if (todoDetails) {
      formProps.setValue("isEdit", true);
      formProps.setValue("todoName", todoDetails.todoName);
      formProps.setValue("status", todoDetails.status);
    } else {
      formProps.setValue("isEdit", false);
    }
  }, [todoDetails]);

  const closeModal = () => {
    formProps.resetField("todoName", "");
    setModal(false);
  };

  const onSubmit = async (values) => {
    if (todoDetails) {
      const payload = {
        todoName: values.todoName,
        status: values.status,
      };
      updateTodo(todoDetails.id, payload);
    } else {
      const payload = {
        todoName: values.todoName,
        status: "todo",
      };
      saveTodo(payload);
    }
    closeModal();
  };

  return (
    <CModal visible={modal} alignment="center" onClose={closeModal}>
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
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
              {todoDetails && (
                <CCol md={12}>
                  <SelectField
                    name="status"
                    type="select"
                    label="Status"
                    valArr={[
                      { label: "Todo", value: "todo" },
                      { label: "In Progress", value: "inProgress" },
                      { label: "Done", value: "done" },
                    ]}
                    required
                  />
                </CCol>
              )}
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
export default TodoForm;
