package com.example.springbootmongodbatlas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.springbootmongodbatlas.entity.Worker;
import com.example.springbootmongodbatlas.service.WorkerService;

@CrossOrigin(origins = "http://localhost:3030")
@RestController
@RequestMapping("api/workers")
public class WorkerController {

	@Autowired
	private WorkerService workerService;

	@GetMapping
	public List<Worker> getWorkers() {
		return workerService.getWorkers();
	}

	@GetMapping("/{id}")
	public Worker getWorkerById(@PathVariable Integer id) {
		return workerService.getWorkerById(id);
	}
	
	@PostMapping("/login")
	public Worker login(@RequestBody Worker worker ) {
		
		String userName= worker.getUserName();
		String password = worker.getPassword();
		return workerService.getWorkerByUserNameAndPassword(userName, password);
	}

	@PostMapping
	public Worker addWorker(@RequestBody Worker worker) {
		return workerService.addWorker(worker);
	}
	
	@PostMapping("/username")
	public Worker getWorkerByUserName(@RequestBody Worker worker){
		String userName = worker.getUserName();
		return workerService.getWorkerByUserName(userName);
	}	
	
	@PostMapping("/newusername")
	public boolean doesWorkerExistByUserName(@RequestBody Worker worker){
		
		String userName = worker.getUserName();
		
		Worker existingWorker = workerService.getWorkerByUserName(userName);
		if(existingWorker==null)
			return false;
		else 
			return true;
	}
	
	

	@PutMapping("/{id}")
	public Worker updateWorker(@RequestBody Worker worker, @PathVariable Integer id) {
		return workerService.updateWorker(id, worker);
	}
	
	@PutMapping("/passwordUpdate/{id}")
	public String updatePassword(@RequestBody Worker worker,@PathVariable Integer id) {
		
		String password = worker.getPassword();
		if(workerService.updatePassword(id, password)!=null) {
			return "successfully updated !!";
		}
		return "Could Not Update !!" ;
	}

	@DeleteMapping("/{id}")
	public Worker deleteWorker(@PathVariable Integer id) {
		return workerService.deleteWorker(id);
	}
	
	}