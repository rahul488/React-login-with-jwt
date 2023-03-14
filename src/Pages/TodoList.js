import { CCard, CCardBody, CCardTitle, CCol, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import SingleTodo from "../Components/SingleTodo";
import useFetch from "../hooks/useFetch";
import { GETTODOS } from "../Util/ApiUrl";

const TodoList = ({
  updateTodoStatus,
  reArrangeTodos,
  deleteTodo,
  updateTodo,
}) => {
  const [todos, setTodos] = useState([]);
  const [progressTodo, setProgressedTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);

  const { data: todoList, get: GetTodos } = useFetch();

  useEffect(() => {
    GetTodos(GETTODOS);
  }, []);

  useEffect(() => {
    const todo = Array.isArray(todoList)
      ? todoList.filter((todo) => todo.status === "todo")
      : [];
    const progress = Array.isArray(todoList)
      ? todoList.filter((todo) => todo.status === "inProgress")
      : [];
    const done = Array.isArray(todoList)
      ? todoList.filter((todo) => todo.status === "done")
      : [];
    setTodos(todo);
    setProgressedTodo(progress);
    setCompletedTodo(done);
  }, [todoList]);

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleDND = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    //block rearrange for now
    if (
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) ||
      (destination.droppableId === source.droppableId &&
        destination.index !== source.index)
    ) {
      return;
    }

    let payload = {};

    let add;
    let active = todos;
    let progress = progressTodo;
    let done = completedTodo;
    // Source Logic
    //TODO:- Add rearrange functiolaty later
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index !== source.index
    // ) {
    //   if (source.droppableId === "todoList") {
    //     add = active[source.index];
    //     active.splice(source.index, 1);
    //     // active.splice(destination.index, 0, add);
    //     //reArrangeTodos(active);
    //   } else if (source.droppableId === "progressTodos") {
    //     add = progress[source.index];
    //     progress.splice(source.index, 1);
    //     // progress.splice(destination.index, 0, add);
    //    // reArrangeTodos(progress);
    //   } else {
    //     add = done[source.index];
    //     done.splice(source.index, 1);
    //     // done.splice(destination.index, 0, add);
    //     //reArrangeTodos(done);
    //   }
    // }

    // Destination Logic
    if (destination.droppableId === "todoList") {
      payload["status"] = "todo";
      updateTodoStatus(result.draggableId, payload);
    } else if (destination.droppableId === "progressTodos") {
      payload["status"] = "inProgress";
      updateTodoStatus(result.draggableId, payload);
    } else {
      payload["status"] = "done";
      updateTodoStatus(result.draggableId, payload);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDND}>
      <CRow className="mt-4">
        <CCol md={4}>
          <CCard>
            <CCardTitle className="text-center mt-2">Your Todo's</CCardTitle>
            <CCardBody>
              <SingleTodo
                droppableId="todoList"
                todoList={todos}
                handleDelete={handleDelete}
                updateTodo={updateTodo}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CCard>
            <CCardTitle className="text-center mt-2">In Progress</CCardTitle>
            <CCardBody>
              <SingleTodo
                droppableId="progressTodos"
                todoList={progressTodo}
                handleDelete={handleDelete}
                updateTodo={updateTodo}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CCard>
            <CCardTitle className="text-center mt-2">Done</CCardTitle>
            <CCardBody>
              <SingleTodo
                droppableId="doneTodos"
                todoList={completedTodo}
                handleDelete={handleDelete}
                updateTodo={updateTodo}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </DragDropContext>
  );
};
export default TodoList;
