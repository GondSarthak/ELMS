package com.example.springbootmongodbatlas.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class LeaveDto {

	private LocalDate startDate;
	private LocalDate endDate;
	private String leaveType;
	private String status = "PENDING";
	private String reason;
	
}
