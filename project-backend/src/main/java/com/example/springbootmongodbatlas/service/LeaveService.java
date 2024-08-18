package com.example.springbootmongodbatlas.service;

import java.time.LocalDate;
import java.util.List;

import com.example.springbootmongodbatlas.entity.Leave;
import com.example.springbootmongodbatlas.entity.Worker;

public interface LeaveService {

	public List<Leave> getAllLeaves(Integer workerId);
	
	public Leave getLeave(Integer id);
	
	public Leave addLeave(Leave leave, Worker worker);
	
	public Leave deleteLeave(Leave leave);
	
	public Leave updateStatus(Leave leave, Worker worker, Integer id);

	public List<Leave> getAllLeavesByStartDate(Integer workerid, LocalDate startDate);
	
	public List<Leave> getAllLeavesByPendingStatus(Integer workerid, String status);
	public List<Leave> getAllLeavesByAcceptedStatus(Integer workerid, String status);
	public List<Leave> getAllLeavesByRejectedStatus(Integer workerid, String status);
	
}
