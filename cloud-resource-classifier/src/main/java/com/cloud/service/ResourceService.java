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

    // In-memory storage for added resources
    private List<CloudResource> runtimeResources = new ArrayList<>();

    /**
     * Thêm tài nguyên mới
     */
    public CloudResource addResource(CloudResource resource) throws IOException {
        List<CloudResource> allResources = loadResources();
        
        // Generate new ID
        int maxId = allResources.stream()
            .mapToInt(r -> Integer.parseInt(r.getId()))
            .max()
            .orElse(0);
        
        resource.setId(String.valueOf(maxId + 1));
        
        // Classify the new resource
        ruleEngine.classifyResource(resource);
        
        // Add to runtime list
        runtimeResources.add(resource);
        
        return resource;
    }

    /**
     * Xóa tài nguyên
     */
    public boolean deleteResource(String id) {
        return runtimeResources.removeIf(r -> r.getId().equals(id));
    }

    /**
     * Kiểm tra cảnh báo quá tải
     */
    public List<java.util.Map<String, Object>> checkOverloadAlerts() throws IOException {
        List<CloudResource> resources = loadResources();
        resources.addAll(runtimeResources);
        
        List<java.util.Map<String, Object>> alerts = new ArrayList<>();
        
        // Ngưỡng cảnh báo
        final int CPU_HIGH_THRESHOLD = 6;
        final int CPU_CRITICAL_THRESHOLD = 8;
        final int MEM_HIGH_THRESHOLD = 12;
        final int MEM_CRITICAL_THRESHOLD = 16;
        
        for (CloudResource resource : resources) {
            String severity = null;
            String message = null;
            
            // Check CPU overload
            if (resource.getCpu() >= CPU_CRITICAL_THRESHOLD) {
                severity = "CRITICAL";
                message = String.format("CPU quá tải nguy hiểm! %d vCPU (>= %d)", 
                    resource.getCpu(), CPU_CRITICAL_THRESHOLD);
            } else if (resource.getCpu() >= CPU_HIGH_THRESHOLD) {
                severity = "WARNING";
                message = String.format("CPU cao! %d vCPU (>= %d)", 
                    resource.getCpu(), CPU_HIGH_THRESHOLD);
            }
            
            // Check Memory overload
            if (resource.getMem() >= MEM_CRITICAL_THRESHOLD) {
                severity = "CRITICAL";
                message = (message != null ? message + " | " : "") + 
                    String.format("Memory quá tải nguy hiểm! %d GB (>= %d)", 
                        resource.getMem(), MEM_CRITICAL_THRESHOLD);
            } else if (resource.getMem() >= MEM_HIGH_THRESHOLD) {
                if (severity == null) severity = "WARNING";
                message = (message != null ? message + " | " : "") + 
                    String.format("Memory cao! %d GB (>= %d)", 
                        resource.getMem(), MEM_HIGH_THRESHOLD);
            }
            
            // Add alert if found
            if (severity != null) {
                java.util.Map<String, Object> alert = new java.util.HashMap<>();
                alert.put("resourceId", resource.getId());
                alert.put("resourceName", resource.getName());
                alert.put("severity", severity);
                alert.put("message", message);
                alert.put("cpu", resource.getCpu());
                alert.put("memory", resource.getMem());
                alert.put("classification", resource.getClassification());
                alert.put("timestamp", java.time.LocalDateTime.now().toString());
                
                alerts.add(alert);
            }
        }
        
        return alerts;
    }
}
