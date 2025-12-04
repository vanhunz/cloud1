package com.cloud.service;

import com.cloud.model.CloudResource;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Service để quản lý tài nguyên Cloud
 * - Load dữ liệu từ JSON
 * - Áp dụng Rule Engine
 * - Trả về kết quả phân loại
 */
@Service
public class ResourceService {

    @Autowired
    private RuleEngine ruleEngine;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Load toàn bộ tài nguyên từ file JSON
     */
    public List<CloudResource> loadResources() throws IOException {
        ClassPathResource resource = new ClassPathResource("data/resources.json");
        InputStream inputStream = resource.getInputStream();
        
        List<CloudResource> resources = objectMapper.readValue(
            inputStream,
            new TypeReference<List<CloudResource>>() {}
        );
        
        return resources;
    }

    /**
     * Phân loại toàn bộ tài nguyên
     */
    public List<CloudResource> classifyAllResources() throws IOException {
        List<CloudResource> resources = loadResources();
        
        // Áp dụng Rule Engine cho từng resource
        for (CloudResource resource : resources) {
            ruleEngine.classifyResource(resource);
        }
        
        return resources;
    }

    /**
     * Phân loại một tài nguyên cụ thể theo ID
     */
    public CloudResource classifyResourceById(String id) throws IOException {
        List<CloudResource> resources = loadResources();
        
        for (CloudResource resource : resources) {
            if (resource.getId().equals(id)) {
                ruleEngine.classifyResource(resource);
                return resource;
            }
        }
        
        return null;
    }

    /**
     * Lấy thống kê phân loại
     */
    public String getClassificationStats() throws IOException {
        List<CloudResource> resources = classifyAllResources();
        
        long production = resources.stream()
            .filter(r -> r.getClassification().contains("Production"))
            .count();
            
        long testing = resources.stream()
            .filter(r -> r.getClassification().contains("Testing"))
            .count();
            
        long staging = resources.stream()
            .filter(r -> r.getClassification().contains("Staging"))
            .count();
            
        long critical = resources.stream()
            .filter(r -> r.getClassification().contains("Critical"))
            .count();
            
        return String.format(
            """
            === CLASSIFICATION STATISTICS ===
            Total Resources: %d
            Production: %d
            Testing: %d
            Staging: %d
            Critical Resources: %d
            =================================
            """,
            resources.size(), production, testing, staging, critical
        );
    }
}
