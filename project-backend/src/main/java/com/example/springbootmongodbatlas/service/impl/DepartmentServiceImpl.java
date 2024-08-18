package com.example.springbootmongodbatlas.service.impl;

import com.example.springbootmongodbatlas.entity.Department;
import com.example.springbootmongodbatlas.repo.DepartmentRepository;
import com.example.springbootmongodbatlas.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {
	
	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private SequenceGeneratorServiceImpl generatorServiceImpl;

	@Override
	public List<Department> getDepts() {
		return departmentRepository.findAll();
	}
	
	@Override
	public Department getDeptById(Integer id) {
		return departmentRepository.findById(id).get();
	}

	@Override
	public Department addDept(Department dept) {
		dept.setId(generatorServiceImpl.generateSequence(Department.SEQUENCE_NAME));
		return departmentRepository.save(dept);
	}

	@Override
	public Department deleteDept(Integer id) {
		Department dept = departmentRepository.findById(id).get();
		departmentRepository.delete(dept);
		return dept;
	}

	@Override
	public Department updateDept(Integer id, Department dept) {

		dept.setId(id);
		return departmentRepository.save(dept);

	}
}