package com.example.springbootmongodbatlas.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "leaves")
public class Leave {
	
	@Transient
	public static final String SEQUENCE_NAME = "leaves_sequence";

	@Id
	private Integer id;

	private LocalDate startDate;
	private LocalDate endDate;

	@Field("type_of_leave")
	private LeaveType leaveType;

	private String status = "PENDING";
	private String reason;

	private Integer workerid;

//	public void setMyWorker(Worker worker) {
//		this.worker = worker;
//	}

}
