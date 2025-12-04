package com.cloud.model;

import java.util.HashMap;
import java.util.Map;

public class CloudResource {
    private String id;
    private String name;
    private int cpu;
    private int mem;
    private Map<String, String> tags;
    private String classification;

    // Constructors
    public CloudResource() {
        this.tags = new HashMap<>();
    }

    public CloudResource(String id, String name, int cpu, int mem, Map<String, String> tags) {
        this.id = id;
        this.name = name;
        this.cpu = cpu;
        this.mem = mem;
        this.tags = tags != null ? tags : new HashMap<>();
        this.classification = "Not Classified";
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCpu() {
        return cpu;
    }

    public void setCpu(int cpu) {
        this.cpu = cpu;
    }

    public int getMem() {
        return mem;
    }

    public void setMem(int mem) {
        this.mem = mem;
    }

    public Map<String, String> getTags() {
        return tags;
    }

    public void setTags(Map<String, String> tags) {
        this.tags = tags;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    @Override
    public String toString() {
        return "CloudResource{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", cpu=" + cpu +
                ", mem=" + mem +
                ", tags=" + tags +
                ", classification='" + classification + '\'' +
                '}';
    }
}
