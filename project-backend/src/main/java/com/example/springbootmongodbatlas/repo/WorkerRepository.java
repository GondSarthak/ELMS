package com.example.springbootmongodbatlas.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.springbootmongodbatlas.entity.Worker;

@Repository
public interface WorkerRepository extends MongoRepository<Worker, Integer> {
	public Worker findByUserNameAndPassword(String userName, String password);
	public Worker findByUserName(String userName);
	public boolean existsByUserName(String userName);
	
}
