package com.assg.pioapp.Service;

import com.assg.pioapp.Entity.Customer;
import com.assg.pioapp.Exception.CustomerNotFoundException;
import com.assg.pioapp.Repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class CustomerDetailService implements UserDetailsService {


    @Autowired
    private CustomerRepo customerRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws CustomerNotFoundException {
        Customer customer=customerRepo.findByEmail(username);

        if(customer == null)
            throw new CustomerNotFoundException("User not found");

        return new CustomUserDetails(customer);
    }
}
