package com.example.springbootmongodbatlas.scheduler;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.springbootmongodbatlas.entity.Worker;
import com.example.springbootmongodbatlas.service.WorkerService;

@Component
public class LeaveBalanceResetTask {

    private final WorkerService workerService;

    public LeaveBalanceResetTask(WorkerService workerService) {
        this.workerService = workerService;
    }

    @Scheduled(cron = "0 0 0 1 1 *") 
    public void resetLeaveBalancesForYear() {
        List<Worker> workers = workerService.getWorkers();
        for (Worker worker : workers) {
            resetLeaveBalances(worker);
        }
    }

    private void resetLeaveBalances(Worker worker) {
        
        worker.setSickLeaveBalance(2);
        worker.setCasualLeaveBalance(4);
        worker.setPrivilegeLeaveBalance(6);

        // Update the worker entity in the database
        workerService.updateWorker(worker.getId(), worker);
    }
}
