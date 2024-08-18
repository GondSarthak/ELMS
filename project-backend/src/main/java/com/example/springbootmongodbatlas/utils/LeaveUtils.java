package com.example.springbootmongodbatlas.utils;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

import com.example.springbootmongodbatlas.entity.Leave;
import com.example.springbootmongodbatlas.entity.LeaveType;
import com.example.springbootmongodbatlas.entity.Worker;
import com.example.springbootmongodbatlas.exceptions.InvalidInputException;
import com.example.springbootmongodbatlas.repo.WorkerRepository;
import com.example.springbootmongodbatlas.service.LeaveService;
import com.example.springbootmongodbatlas.service.WorkerService;

public class LeaveUtils {
	public static int calculateLeaveDurationInDays(LocalDate startDate, LocalDate endDate)
			throws InvalidInputException {

//		LocalDate currentDate = LocalDate.now();

		int days = 0;
		LocalDate date = startDate;
		while (!date.isAfter(endDate)) {
			if (!(date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY)) {
				days++;
			}
			date = date.plusDays(1);
		}

		return days;
	}

	public static boolean hasSufficientLeaveBalance(Worker worker, LeaveType leaveType, int leaveDurationInDays) {
		// Implement logic to check if the employee has sufficient leave balance
		switch (leaveType) {
		case SICK_LEAVE:
			return worker.getSickLeaveBalance() >= leaveDurationInDays;
		case CASUAL_LEAVE:
			return worker.getCasualLeaveBalance() >= leaveDurationInDays;
		case PRIVILEGE_LEAVE:
			return worker.getPrivilegeLeaveBalance() >= leaveDurationInDays;
		default:
			return false;
		}
	}

	public static void deductLeaveBalance(Worker worker, LeaveType leaveType, int leaveDurationInDays,
			WorkerService workerService) {

		Integer workerid = worker.getId();
		// Deduct leave balance based on leave type and duration
		switch (leaveType) {
		case SICK_LEAVE:
			worker.setSickLeaveBalance(worker.getSickLeaveBalance() - leaveDurationInDays);
			break;
		case CASUAL_LEAVE:
			worker.setCasualLeaveBalance(worker.getCasualLeaveBalance() - leaveDurationInDays);
			break;
		case PRIVILEGE_LEAVE:
			worker.setPrivilegeLeaveBalance(worker.getPrivilegeLeaveBalance() - leaveDurationInDays);
			break;
		}

		// Update the employee entity in the database
		workerService.updateWorker(workerid, worker);
	}

	public static boolean doesLeaveWithSameStartDateExist(Leave newLeave, Worker worker, LeaveService leaveService) {

		Integer workerid = worker.getId();
		LocalDate startDate = newLeave.getStartDate();
		List<Leave> existingLeaves = leaveService.getAllLeavesByStartDate(workerid, startDate);

		for (Leave existingLeave : existingLeaves) {
			if (newLeave.getStartDate().isEqual(existingLeave.getStartDate())) {
				return true;
			}

		}
		return false;
	}

	public static boolean doesLeaveOverlapOrIntersect(Leave newLeave, Worker worker, LeaveService leaveService) {

		Integer workerId = worker.getId();
		LocalDate newLeaveStartDate = newLeave.getStartDate();
		LocalDate newLeaveEndDate = newLeave.getEndDate();

		List<Leave> existingLeaves = leaveService.getAllLeaves(workerId);

		for (Leave existingLeave : existingLeaves) {

			if (existingLeave.getStatus().equals("REJECTED")) {
				continue;
			}

			LocalDate existingLeaveStartDate = existingLeave.getStartDate();
			LocalDate existingLeaveEndDate = existingLeave.getEndDate();

			if ((newLeaveStartDate.isAfter(existingLeaveStartDate) && newLeaveStartDate.isBefore(existingLeaveEndDate))
					|| (newLeaveEndDate.isAfter(existingLeaveStartDate)
							&& newLeaveEndDate.isBefore(existingLeaveEndDate))
					|| newLeaveStartDate.isEqual(existingLeaveStartDate)
					|| newLeaveEndDate.isEqual(existingLeaveEndDate)) {
				return true;
			}
		}
		return false;
	}

	public static void restoreLeaveBalance(Worker worker, Leave leave, WorkerRepository workerRepository)
			throws InvalidInputException {

		LeaveType leaveType = leave.getLeaveType();

		int leaveDurationInDays = calculateLeaveDurationInDays(leave.getStartDate(), leave.getEndDate());

		switch (leaveType) {
		case SICK_LEAVE:
			worker.setSickLeaveBalance(worker.getSickLeaveBalance() + leaveDurationInDays);
			break;
		case CASUAL_LEAVE:
			worker.setCasualLeaveBalance(worker.getCasualLeaveBalance() + leaveDurationInDays);
			break;
		case PRIVILEGE_LEAVE:
			worker.setPrivilegeLeaveBalance(worker.getPrivilegeLeaveBalance() + leaveDurationInDays);
			break;
		default:

			break;
		}

		// Save the updated worker entity
		workerRepository.save(worker);
	}
}
