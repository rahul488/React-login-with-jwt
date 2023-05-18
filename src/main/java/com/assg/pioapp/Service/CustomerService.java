package com.assg.pioapp.Service;

import com.assg.pioapp.DTO.CustomerDTO;
import com.assg.pioapp.DTO.CustomerResponseDTO;
import com.assg.pioapp.Entity.Customer;
import com.assg.pioapp.Exception.CustomerNotFoundException;
import com.assg.pioapp.Repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


@Service
public class CustomerService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private CustomerRepo customerRepo;


    public String saveCustomer(CustomerDTO customerDTO) throws Exception {

       Customer isEmailExist = customerRepo.findByEmail(customerDTO.getEmail());
       if(isEmailExist != null){
           throw new Exception("Customer already exist");
       }
        Customer customer= new Customer();
        List<String> numbers=new ArrayList<>();

        //storing file in local
        customer.setAddress(customerDTO.getAddress());
        File localFile = new File("D:/photos/"+customerDTO.getProfile().getOriginalFilename());
        localFile.createNewFile();
        FileOutputStream output = new FileOutputStream(localFile);
        output.write(customerDTO.getProfile().getBytes());
        output.close();


        customer.setFirstName(customerDTO.getFirstName());
        customer.setLastName(customerDTO.getLastName());
        customer.setEmail(customerDTO.getEmail());
        customer.setAge(customerDTO.getAge());
        customer.setGender(customerDTO.getGender());
        customerDTO.getMobileNumber().forEach((num)->{
            numbers.add(num);
        });
        customer.setMobileNumber(numbers);
        customer.setProfilePath(localFile.getPath());
        customer.setMaritalStatus(customerDTO.getMaritalStatus());
        customer.setPassword(passwordEncoder.encode(customerDTO.getPassword()));
        customer.setHobby(customerDTO.getHobby());
        customer.setRole("ROLE_USER");
        customer.setEnableTAndC(customerDTO.getTermAndCondition()?true:false);

        customerRepo.save(customer);
        return "User created successfully";
    }

    public CustomerResponseDTO getCustomer(String id) throws IOException {

        Customer customer = customerRepo.findById(id).orElse(null);
        CustomerResponseDTO customerResponseDTO = new CustomerResponseDTO();

       if(customer != null) {
           String profilePath = customer.getProfilePath();
           String fileName = Paths.get(profilePath).getFileName().toString();
           customerResponseDTO.setFirstName(customer.getFirstName());
           customerResponseDTO.setLastName(customer.getLastName());
           customerResponseDTO.setEmail(customer.getEmail());
           customerResponseDTO.setAddress(customer.getAddress());
           customerResponseDTO.setAge(customer.getAge());
           customerResponseDTO.setGender(customer.getGender());
           customerResponseDTO.setAddress(customer.getAddress());
           customerResponseDTO.setMaritalStatus(customer.getMaritalStatus());
           customerResponseDTO.setMobileNumber(customer.getMobileNumber());
           customerResponseDTO.setTermAndConditions(customer.getEnableTAndC());
           customerResponseDTO.setFileName(fileName);
           customerResponseDTO.setHobby(customer.getHobby());
       }
        return customerResponseDTO;
    }

    public ResponseEntity<?> updateCustomer(String id, CustomerDTO customerDTO) throws IOException {

        Customer customer = customerRepo.findById(id).orElse(null);
        if(customer == null) throw new CustomerNotFoundException("Customer Not Found.");

        List<String> numbers=new ArrayList<>();

        //storing file in local
        customer.setAddress(customerDTO.getAddress());
        File localFile = new File("D:/photos/"+customerDTO.getProfile().getOriginalFilename());
        localFile.createNewFile();
        FileOutputStream output = new FileOutputStream(localFile);
        output.write(customerDTO.getProfile().getBytes());
        output.close();

        customer.setFirstName(customerDTO.getFirstName());
        customer.setLastName(customerDTO.getLastName());
        customer.setEmail(customerDTO.getEmail());
        customer.setAge(customerDTO.getAge());
        customer.setGender(customerDTO.getGender());
        customerDTO.getMobileNumber().forEach((num)->{
            numbers.add(num);
        });
        customer.setHobby(customerDTO.getHobby());
        customer.setMobileNumber(numbers);
        customer.setProfilePath(localFile.getPath());
        customer.setMaritalStatus(customerDTO.getMaritalStatus());
        customer.setEnableTAndC(customerDTO.getTermAndCondition()?true:false);

        customerRepo.save(customer);

        return new ResponseEntity<>("User updated successfully",HttpStatus.OK);
    }

    public byte[] getProfileImage(String id) throws IOException {
        Customer customer = customerRepo.findById(id).orElse(null);
        if(customer == null) throw new CustomerNotFoundException("Customer not found");
        String profilePath = customer.getProfilePath();
        byte[] buffer= Files.readAllBytes(Paths.get(profilePath));

        return buffer;

    }
}
