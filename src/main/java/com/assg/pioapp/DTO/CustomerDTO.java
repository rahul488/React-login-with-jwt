package com.assg.pioapp.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
        private String firstName;

        private String lastName;

        private String email;

        private String password;

        private List<String> mobileNumber;

        private String gender;

        private int age;

        private MultipartFile profile;

        private String maritalStatus;

        private String address;

        private String[] hobby;

        private Boolean termAndCondition = false;

}
