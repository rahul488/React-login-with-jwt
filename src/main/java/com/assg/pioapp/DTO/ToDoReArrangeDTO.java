package com.assg.pioapp.DTO;

import com.assg.pioapp.Entity.Todo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ToDoReArrangeDTO {

    private List<Todo> reArrangedTodos;
}
