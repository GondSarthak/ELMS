package com.example.springbootmongodbatlas.service;

import com.example.springbootmongodbatlas.entity.Department;

import java.util.List;

public interface DepartmentService {

	public List<Department> getDepts();
	
	public Department getDeptById(Integer id);

	public Department addDept(Department dept);

	public Department deleteDept(Integer id);

	public Department updateDept(Integer id, Department dept);
}
