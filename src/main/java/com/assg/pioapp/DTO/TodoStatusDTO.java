package com.assg.pioapp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoStatusDTO {

    private List<String> todoIds;

    private String status;
}
