package com.assg.pioapp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponseDTO {

    private String firstName;

    private String lastName;

    private String email;

    private List<String> mobileNumber;

    private String gender;

    private int age;

    private String fileName;

    private String maritalStatus;

    private String address;

    private String[] hobby;

    private Boolean termAndConditions = false;
}
