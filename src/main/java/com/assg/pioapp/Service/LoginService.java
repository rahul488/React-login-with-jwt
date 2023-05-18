package com.assg.pioapp.Service;

import com.assg.pioapp.DTO.AuthRequest;
import com.assg.pioapp.DTO.LoginResponseDTO;
import com.assg.pioapp.Exception.CustomerNotFoundException;
import com.assg.pioapp.Repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerDetailService customerDetailService;

    public LoginResponseDTO createToken(AuthRequest authRequest){
        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(),authRequest.getPassword()));
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        if(authentication.isAuthenticated()) {
            CustomUserDetails customerDetails = (CustomUserDetails) customerDetailService.loadUserByUsername(authRequest.getUserName());
            loginResponseDTO.setId(customerDetails.getId());
            String token = jwtService.generateToken(authRequest.getUserName());
            loginResponseDTO.setToken(token);
            loginResponseDTO.setTokenExpireDate(jwtService.extractExpiration(token));
        }else{
            throw new CustomerNotFoundException("Customer not found");
        }
        return loginResponseDTO;
    }
}
