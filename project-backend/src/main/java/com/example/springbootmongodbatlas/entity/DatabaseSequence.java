package com.example.springbootmongodbatlas.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Document(collection = "database_sequences")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class DatabaseSequence {

    @Id
    private String id;

    private Integer seq;

}
