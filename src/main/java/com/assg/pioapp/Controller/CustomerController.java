package com.assg.pioapp.Controller;

import com.assg.pioapp.DTO.AuthRequest;
import com.assg.pioapp.DTO.CustomerDTO;
import com.assg.pioapp.DTO.LoginResponseDTO;
import com.assg.pioapp.Entity.Customer;
import com.assg.pioapp.Exception.CustomerNotFoundException;
import com.assg.pioapp.Service.CustomerService;
import com.assg.pioapp.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/customer/public")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private CustomerService customerService;

    @PostMapping("/login")
    public LoginResponseDTO authenticateAndGetToken(@RequestBody AuthRequest authRequest) throws CustomerNotFoundException{
       return loginService.createToken(authRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@ModelAttribute CustomerDTO customerDTO) throws Exception {
        return new ResponseEntity<>(customerService.saveCustomer(customerDTO), HttpStatus.OK);
    }

    @GetMapping("/profile/image/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) throws IOException{
        byte[] content = customerService.getProfileImage(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(content);
    }

}
