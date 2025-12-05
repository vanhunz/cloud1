package com.cloud.controller;

import com.cloud.model.CloudResource;
import com.cloud.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST API Controller cho Cloud Resource Classification
 */
@RestController
@RequestMapping("/resources")
@CrossOrigin(origins = "http://localhost:3000")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    /**
     * GET /resources
     * Lấy toàn bộ tài nguyên (chưa phân loại)
     */
    @GetMapping
    public ResponseEntity<?> getAllResources() {
        try {
            List<CloudResource> resources = resourceService.loadResources();
            return ResponseEntity.ok(resources);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Failed to load resources: " + e.getMessage()));
        }
    }

    /**
     * POST /resources/classify
     * Phân loại toàn bộ tài nguyên
     */
    @PostMapping("/classify")
    public ResponseEntity<?> classifyResources() {
        try {
            List<CloudResource> classifiedResources = resourceService.classifyAllResources();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Classification completed successfully");
            response.put("totalResources", classifiedResources.size());
            response.put("resources", classifiedResources);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Failed to classify resources: " + e.getMessage()));
        }
    }

    /**
     * GET /resources/{id}
     * Lấy thông tin một tài nguyên cụ thể
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getResourceById(@PathVariable String id) {
        try {
            CloudResource resource = resourceService.classifyResourceById(id);
            
            if (resource == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse("Resource not found with ID: " + id));
            }
            
            return ResponseEntity.ok(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Failed to get resource: " + e.getMessage()));
        }
    }

    /**
     * GET /resources/stats/summary
     * Lấy thống kê phân loại
     */
    @GetMapping("/stats/summary")
    public ResponseEntity<?> getStats() {
        try {
            String stats = resourceService.getClassificationStats();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("statistics", stats);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Failed to get statistics: " + e.getMessage()));
        }
    }

    /**
     * POST /resources/add
     * Thêm tài nguyên mới
     */
    @PostMapping("/add")
    public ResponseEntity<?> addResource(@RequestBody CloudResource resource) {
        try {
            CloudResource addedResource = resourceService.addResource(resource);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Resource added successfully");
            response.put("resource", addedResource);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Failed to add resource: " + e.getMessage()));
        }
    }

    /**
     * DELETE /resources/{id}
     * Xóa tài nguyên
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable String id) {
        try {
            boolean deleted = resourceService.deleteResource(id);
            
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse("Resource not found with ID: " + id));
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Resource deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Failed to delete resource: " + e.getMessage()));
        }
    }

    /**
     * GET /resources/alerts
     * Kiểm tra cảnh báo quá tải
     */
    @GetMapping("/alerts")
    public ResponseEntity<?> getAlerts() {
        try {
            List<Map<String, Object>> alerts = resourceService.checkOverloadAlerts();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("alertCount", alerts.size());
            response.put("alerts", alerts);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Failed to get alerts: " + e.getMessage()));
        }
    }

    /**
     * GET /health
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "Cloud Resource Classifier");
        health.put("version", "1.0.0");
        
        return ResponseEntity.ok(health);
    }

    /**
     * Helper method để tạo error response
     */
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("error", message);
        return error;
    }
}
