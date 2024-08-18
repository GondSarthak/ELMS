package com.example.springbootmongodbatlas.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springbootmongodbatlas.entity.Leave;
import com.example.springbootmongodbatlas.entity.Worker;
import com.example.springbootmongodbatlas.repo.LeaveRepository;
import com.example.springbootmongodbatlas.repo.WorkerRepository;
import com.example.springbootmongodbatlas.service.LeaveService;

@Service
public class LeaveServiceImpl implements LeaveService {

	@Autowired
	private LeaveRepository leaveRepository;

	@Autowired
	private WorkerRepository workerRepository;

	@Autowired
	private SequenceGeneratorServiceImpl generatorServiceImpl;

	@Override
	public List<Leave> getAllLeaves(Integer workerId) {
		return leaveRepository.findByWorkerid(workerId);
	}

	@Override
	public Leave getLeave(Integer id) {
		return leaveRepository.findById(id).get();
	}

	@Override
	public Leave addLeave(Leave leave, Worker worker) {
		leave.setId(generatorServiceImpl.generateSequence(Leave.SEQUENCE_NAME));
		worker.addLeave(leave);
		workerRepository.save(worker);
		return leaveRepository.save(leave);
	}

	@Override
	public Leave deleteLeave(Leave leave) {
		leaveRepository.delete(leave);
		return leave;
	}

	@Override
	public Leave updateStatus(Leave leave, Worker worker, Integer id) {
		Leave leave2 = leaveRepository.findById(id).get();
		worker.removeLeave(leave2);
		leave2.setStatus(leave.getStatus());
		worker.addLeave(leave2);
		workerRepository.save(worker);
		return leaveRepository.save(leave2);
	}

	@Override
	public List<Leave> getAllLeavesByStartDate(Integer workerid, LocalDate startDate) {
		return leaveRepository.findByWorkeridAndStartDate(workerid, startDate);
	}

	@Override
	public List<Leave> getAllLeavesByPendingStatus(Integer workerid, String status) {
		return leaveRepository.findByWorkeridAndStatus(workerid, status);
	}
	
	@Override
	public List<Leave> getAllLeavesByAcceptedStatus(Integer workerid, String status) {
		return leaveRepository.findByWorkeridAndStatus(workerid, status);
	}
	@Override
	public List<Leave> getAllLeavesByRejectedStatus(Integer workerid, String status) {
		return leaveRepository.findByWorkeridAndStatus(workerid, status);
	}
}