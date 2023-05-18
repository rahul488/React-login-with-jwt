package com.assg.pioapp.Repo;

import com.assg.pioapp.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerRepo extends JpaRepository<Customer,String> {

    public Customer findByEmail(String email);

    @Query(value = "select * from customer c where c.id= :id",nativeQuery = true)
    Customer findProfileByCustomerId(@Param("id") int id);
}
