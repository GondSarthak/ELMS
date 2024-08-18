package com.example.springbootmongodbatlas.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.springbootmongodbatlas.entity.Leave;

@Repository
public interface LeaveRepository extends MongoRepository<Leave, Integer> {

	List<Leave> findByWorkerid(Integer workerid);

	List<Leave> findByWorkeridAndStartDate(Integer workerid, LocalDate startDate);
	
	List<Leave> findByWorkeridAndStatus(Integer workerid, String status);
	

}
