package com.cloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Application - Cloud Resource Classifier
 * Hệ thống phân loại tài nguyên động trong môi trường Cloud
 */
@SpringBootApplication
public class CloudResourceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CloudResourceApplication.class, args);
        
        System.out.println("\n" +
            "==============================================\n" +
            "  Cloud Resource Classifier Started!\n" +
            "  Backend API: http://localhost:8080\n" +
            "  Test API: http://localhost:8080/resources/health\n" +
            "==============================================\n"
        );
    }
}
