package com.example.springbootmongodbatlas.repo;

import com.example.springbootmongodbatlas.entity.Department;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends MongoRepository<Department, Integer> {
}
