package com.example.springbootmongodbatlas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class SpringbootMongodbAtlasApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootMongodbAtlasApplication.class, args);
    }

}
