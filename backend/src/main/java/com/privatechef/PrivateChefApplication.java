package com.privatechef;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.privatechef.repository")
public class PrivateChefApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrivateChefApplication.class, args);
    }
}