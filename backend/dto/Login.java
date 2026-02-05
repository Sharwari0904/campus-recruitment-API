package com.tka.EmployeeManagement.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
public class Login {
	private String email;
	private String password;

}
