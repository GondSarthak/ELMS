package com.example.springbootmongodbatlas.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Document(collection ="departments")
public class Department {
	
	@Transient
	public static final String SEQUENCE_NAME = "departments_sequence";
	
    @Id
    private Integer id;
    private String name;
    private String location;
}
