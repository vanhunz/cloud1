package com.cloud.service;

import com.cloud.model.CloudResource;
import org.springframework.stereotype.Component;

/**
 * Rule Engine để phân loại tài nguyên động
 * Áp dụng 3 luật chính:
 * - Rule A: Phân loại theo môi trường (Environment)
 * - Rule B: Phân loại theo mức độ quan trọng (Critical Level)
 * - Rule C: Phân loại theo loại dịch vụ (Service Type)
 */
@Component
public class RuleEngine {

    /**
     * Phân loại một tài nguyên dựa trên các rule
     */
    public void classifyResource(CloudResource resource) {
        String environment = applyRuleA_Environment(resource);
        String criticalLevel = applyRuleB_CriticalLevel(resource);
        String serviceType = applyRuleC_ServiceType(resource);
        
        // Kết hợp kết quả từ 3 rules
        String finalClassification = String.format("%s - %s - %s", 
            environment, criticalLevel, serviceType);
        
        resource.setClassification(finalClassification);
    }

    /**
     * RULE A: Phân loại theo môi trường
     * Ưu tiên: name > tags
     */
    private String applyRuleA_Environment(CloudResource resource) {
        String name = resource.getName().toLowerCase();
        
        // Kiểm tra trong tên
        if (name.contains("prod")) {
            return "Production";
        } else if (name.contains("test")) {
            return "Testing";
        } else if (name.contains("staging")) {
            return "Staging";
        }
        
        // Kiểm tra trong tags
        if (resource.getTags() != null && resource.getTags().containsKey("env")) {
            String env = resource.getTags().get("env").toLowerCase();
            if (env.equals("prod")) {
                return "Production";
            } else if (env.equals("test")) {
                return "Testing";
            } else if (env.equals("staging")) {
                return "Staging";
            }
        }
        
        return "Unknown";
    }

    /**
     * RULE B: Phân loại theo mức độ quan trọng
     * Dựa trên CPU và Memory
     */
    private String applyRuleB_CriticalLevel(CloudResource resource) {
        int cpu = resource.getCpu();
        int mem = resource.getMem();
        
        // Critical: CPU > 6 HOẶC Memory > 10
        if (cpu > 6 || mem > 10) {
            return "Critical Resource";
        }
        
        // Standard: CPU từ 3-6
        if (cpu >= 3 && cpu <= 6) {
            return "Standard Resource";
        }
        
        // Low: CPU < 3
        return "Low Resource";
    }

    /**
     * RULE C: Phân loại theo loại dịch vụ
     * Fake ML Rule - dựa trên pattern matching
     */
    private String applyRuleC_ServiceType(CloudResource resource) {
        String name = resource.getName().toLowerCase();
        
        // Database service
        if (name.startsWith("db-") || name.startsWith("database")) {
            return "Database Service";
        }
        
        // Caching service
        if (name.startsWith("cache-") || name.contains("redis") || name.contains("memcache")) {
            return "Caching Service";
        }
        
        // VM/Compute service
        if (name.startsWith("vm-") || name.startsWith("instance")) {
            return "Compute Service";
        }
        
        // Storage service
        if (name.startsWith("storage") || name.startsWith("s3") || name.startsWith("blob")) {
            return "Storage Service";
        }
        
        return "Generic Service";
    }

    /**
     * Thống kê phân loại
     */
    public String generateClassificationSummary(CloudResource resource) {
        return String.format(
            """
            === CLASSIFICATION REPORT ===
            Resource ID: %s
            Resource Name: %s
            Specifications: CPU=%d, Memory=%dGB
            Environment: %s
            Critical Level: %s
            Service Type: %s
            Final Classification: %s
            =============================
            """,
            resource.getId(),
            resource.getName(),
            resource.getCpu(),
            resource.getMem(),
            applyRuleA_Environment(resource),
            applyRuleB_CriticalLevel(resource),
            applyRuleC_ServiceType(resource),
            resource.getClassification()
        );
    }
}
