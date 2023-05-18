package com.assg.pioapp.Controller;

import com.assg.pioapp.DTO.ToDoReArrangeDTO;
import com.assg.pioapp.DTO.TodoDTO;
import com.assg.pioapp.DTO.TodoStatusDTO;
import com.assg.pioapp.Entity.Todo;
import com.assg.pioapp.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/customer/private")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping("/saveTodo")
    public ResponseEntity<String> saveTodo(@RequestBody TodoDTO todoDTO, Principal principal){
        return new ResponseEntity<>(todoService.save(todoDTO,principal.getName()), HttpStatus.OK);
    }

    @GetMapping("/getTodo")
    public ResponseEntity<List<Todo>> getCustomerTodo(Principal principal){
     return new ResponseEntity<>(todoService.getCustomerTodo(principal.getName()),HttpStatus.OK);
    }

    @PutMapping("/updateStatus")
    public ResponseEntity<String> updateTodoStatus(@RequestBody TodoStatusDTO todoStatusDTO){
        return new ResponseEntity<>(todoService.updateTodoStatus(todoStatusDTO),HttpStatus.OK);
    }
    @PutMapping("/updateTodo/{id}")
    public ResponseEntity<String> updateTodo(@PathVariable String id,@RequestBody TodoDTO todoDTO){
        return new ResponseEntity<>(todoService.updateTodo(id,todoDTO),HttpStatus.OK);
    }
    @PutMapping("/reArrangeTodo")
    public ResponseEntity<String> reArrangeTodo(Principal principal, @RequestBody ToDoReArrangeDTO toDoReArrangeDTO){
        return new ResponseEntity<>(todoService.reArrangeTodo(principal.getName(),toDoReArrangeDTO),HttpStatus.OK);
    }
    @DeleteMapping("/deleteTodo/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable String id){
        return new ResponseEntity<>(todoService.deleteTodo(id),HttpStatus.OK);
    }

}
