package com.assg.pioapp.Service;

import com.assg.pioapp.DTO.ToDoReArrangeDTO;
import com.assg.pioapp.DTO.TodoDTO;
import com.assg.pioapp.DTO.TodoStatusDTO;
import com.assg.pioapp.Entity.Customer;
import com.assg.pioapp.Entity.Todo;
import com.assg.pioapp.Exception.CustomerNotFoundException;
import com.assg.pioapp.Exception.TodoNotFoundException;
import com.assg.pioapp.Repo.CustomerRepo;
import com.assg.pioapp.Repo.TodoRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

    @Autowired
    private TodoRepo todoRepo;

    @Autowired
    private CustomerRepo customerRepo;


    public String save(TodoDTO todoDTO,String userName){
        Customer customer = customerRepo
                .findByEmail(userName);

        if(customer == null) throw new UsernameNotFoundException("User not found");

        Todo todo=new Todo();
        todo.setTodoName(todoDTO.getTodoName());
        todo.setStatus(todoDTO.getStatus());
        todo.setCustomer(customer);


        todoRepo.save(todo);


        return "Todo created Successfully";


    }

    public List<Todo> getCustomerTodo(String userName){
        Customer customer = customerRepo.findByEmail(userName);

        if(customer == null) throw new CustomerNotFoundException("Customer not found");

        return customer.getTodos();
    }

    public String updateTodoStatus(TodoStatusDTO todoStatusDTO){

        List<String> ids=todoStatusDTO.getTodoIds();
        String status = todoStatusDTO.getStatus();
//        Todo todo = todoRepo.findById(todoId).orElse(null);
//        if(todo == null) throw new TodoNotFoundException("Todo Not Found");
//
        List<Todo> todos = new ArrayList<>();
        ids.forEach((id)-> {
            Todo todo = todoRepo.findById(id).orElse(null);
            if(todo != null){
                todos.add(todo);
            }
        });

        todos.forEach((todo) -> {
            todo.setStatus(status);
            todoRepo.save(todo);
        });

        return "Todo status updated successfully.";
    }

    public String updateTodo(String todoId,TodoDTO todoDTO){
        Todo todo = todoRepo.findById(todoId).orElse(null);
        if(todo == null) throw new TodoNotFoundException("Todo Not Found");

        todo.setTodoName(todoDTO.getTodoName());
        todo.setStatus(todoDTO.getStatus());

        todoRepo.save(todo);

        return "Todo updated successfully.";
    }

    public String reArrangeTodo(String userName, ToDoReArrangeDTO toDoReArrangeDTO){
        Customer customer = customerRepo.findByEmail(userName);

        if(customer == null) throw new CustomerNotFoundException("Customer Not Found");

        List<Todo> list= new ArrayList<>();
        final ObjectMapper op=new ObjectMapper();
        toDoReArrangeDTO.getReArrangedTodos().forEach(eachTodo -> {
            final Todo convertedObject = op.convertValue(eachTodo,Todo.class);
            list.add(convertedObject);
        });
        customer.setTodos(list);

        customerRepo.save(customer);

        return "Todo ReArranged Successfully.";
    }

    public String deleteTodo(String id){

        Todo todo = todoRepo.findById(id).orElse(null);

        if(todo == null){
            throw new TodoNotFoundException("Todo not found");
        }

        todoRepo.delete(todo);

        return "Todo deleted successfully.";
    }

}
