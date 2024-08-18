package com.example.springbootmongodbatlas.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Document(collection = "workers")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Worker {

	@Transient
	public static final String SEQUENCE_NAME = "workers_sequence";

	@Id
	private Integer id;

	private String userName;

	private String password;

	private String email;

	private Designation designation;

	private LocalDate joinDate;

	private int sickLeaveBalance = 2;

	private int casualLeaveBalance = 4;

	private int privilegeLeaveBalance = 6;

	private List<Leave> leaves = new ArrayList<>();

	public void addLeave(Leave leave) {
		leaves.add(leave);
	}
	
	public void removeLeave(Leave leave) {
		leaves.remove(leave);
	}

}
