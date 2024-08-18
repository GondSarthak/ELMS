package com.example.springbootmongodbatlas.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
@SuppressWarnings("serial")
public class InvalidInputException extends Exception {

	public InvalidInputException(String mesg) {
		 super(mesg);
	}
	
}
