package com.example.springbootmongodbatlas.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.springbootmongodbatlas.entity.Department;
import com.example.springbootmongodbatlas.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3030")
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;

	@GetMapping
	public List<Department> getDepts() {
		return departmentService.getDepts();
	}

	@GetMapping("/{id}")
	public Department getDeptById(@PathVariable Integer id) {
		return departmentService.getDeptById(id);
	}

	@PostMapping
	public Department addDept(@RequestBody Department dept) {
		return departmentService.addDept(dept);
	}

	@PutMapping("/{id}")
	public Department updateDept(@PathVariable Integer id, @RequestBody Department dept) {
		return departmentService.updateDept(id, dept);
	}

	@DeleteMapping("/{id}")
	public Department delete(@PathVariable Integer id) {
		return departmentService.deleteDept(id);
	}
}