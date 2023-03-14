import { CButton } from "@coreui/react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import {
  DELETETODO,
  REARRANGETODO,
  SAVETODO,
  UPDATETODO,
  UPDATETODOSTATUS,
} from "../Util/ApiUrl";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import Spinner from "../Components/Sppinner";
import Alert from "../Components/Alert";

const TodoPage = () => {
  const [modal, setModal] = useState(false);
  const { post, loading, success, error, put, message, del } = useFetch();

  const handleModal = () => {
    setModal(true);
  };

  const saveTodo = (payload) => {
    post(SAVETODO, payload);
  };
  const updateTodoStatus = (id, payload) => {
    put(UPDATETODOSTATUS + `${id}?status=${payload["status"]}`);
  };
  const reArrangeTodos = (payload) => {
    put(REARRANGETODO, {
      reArrangedTodos: payload,
    });
  };
  const deleteTodo = (id) => {
    del(DELETETODO + `${id}`);
  };
  const updateTodo = (id, payload) => {
    put(UPDATETODO + `${id}`, payload);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="todo_wrapper">
      <Alert success={success} error={error} message={message} />
      <div className="button_wrapper">
        <CButton color="primary" onClick={handleModal}>
          Add Todo
        </CButton>
      </div>
      <TodoList
        updateTodoStatus={updateTodoStatus}
        reArrangeTodos={reArrangeTodos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      <TodoForm
        modal={modal}
        setModal={setModal}
        saveTodo={saveTodo}
        updateTodo={updateTodo}
        title="Add Your Todo"
      />
    </div>
  );
};
export default TodoPage;
