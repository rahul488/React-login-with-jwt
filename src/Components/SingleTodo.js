import { cilApplications, cilDelete, cilPen } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoForm from "../Pages/TodoForm";

const SingleTodo = ({ droppableId, todoList, handleDelete, updateTodo }) => {
  const [modal, setModal] = useState(false);
  const [todoDetails, setTodoDetails] = useState();

  const handleModal = (todoDetails) => {
    setModal(true);
    setTodoDetails(todoDetails);
  };

  return (
    <>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoList.map((todo, index) => (
              <Draggable
                draggableId={todo.id.toString()}
                index={index}
                key={todo.id.toString()}
              >
                {(provided) => (
                  <div
                    className="todoListWrapper"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <div className="todo">
                      <div className="todoName">
                        <CIcon icon={cilApplications} size="lg" />
                        <span className="mt-2">{todo.todoName}</span>
                      </div>
                      <div className="action_wrapper">
                        <CIcon
                          icon={cilPen}
                          size="lg"
                          style={{
                            color: "green",
                            cursor: "pointer",
                          }}
                          onClick={() => handleModal(todo)}
                        />
                        <CIcon
                          icon={cilDelete}
                          size="lg"
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleDelete(todo.id)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <TodoForm
        modal={modal}
        setModal={setModal}
        todoDetails={todoDetails}
        updateTodo={updateTodo}
        title="Update Your Todo"
      />
    </>
  );
};
export default SingleTodo;
