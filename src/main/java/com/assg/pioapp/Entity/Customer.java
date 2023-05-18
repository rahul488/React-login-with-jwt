package com.assg.pioapp.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private List<String> mobileNumber;

    private String gender;

    private int age;

    private String profilePath;

    private String maritalStatus;

    @Column()
    private String address;

    private String[] hobby;

    private Boolean enableTAndC=false;

    private String role;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "customer")
    @JsonIgnore
    private List<Todo> todos=new ArrayList<>();
}
