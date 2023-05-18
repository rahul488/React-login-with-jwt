package com.assg.pioapp.Repo;

import com.assg.pioapp.Entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepo extends JpaRepository<Todo,String> {
}
