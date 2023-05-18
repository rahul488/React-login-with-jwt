package com.assg.pioapp.Controller;

import com.assg.pioapp.DTO.CustomerDTO;
import com.assg.pioapp.DTO.CustomerResponseDTO;
import com.assg.pioapp.Entity.Customer;
import com.assg.pioapp.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/customer/private")
@CrossOrigin(origins = "http://localhost:3000")
public class PrivateCustomerUrlController {

    @Autowired
    private CustomerService customerService;

    @GetMapping(value = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public CustomerResponseDTO getCustomer(@PathVariable("id") String id) throws IOException {
        return customerService.getCustomer(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable("id") String id, @ModelAttribute CustomerDTO customerDTO) throws IOException {
        return customerService.updateCustomer(id,customerDTO);
    }
}
