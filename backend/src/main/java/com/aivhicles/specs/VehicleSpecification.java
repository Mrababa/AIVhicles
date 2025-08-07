package com.aivhicles.specs;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing a market-specific vehicle specification.
 */
@Entity
@Table(name = "vehicle_specifications")
public class VehicleSpecification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String make;
    private String model;
    private String trim;
    private Integer year;
    private String region;
    private String vinPattern;

    @Enumerated(EnumType.STRING)
    private SpecStatus status = SpecStatus.DRAFT;

    private LocalDateTime lastUpdated;

    @PrePersist
    @PreUpdate
    void updateTimestamp() {
        lastUpdated = LocalDateTime.now();
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getTrim() {
        return trim;
    }

    public void setTrim(String trim) {
        this.trim = trim;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getVinPattern() {
        return vinPattern;
    }

    public void setVinPattern(String vinPattern) {
        this.vinPattern = vinPattern;
    }

    public SpecStatus getStatus() {
        return status;
    }

    public void setStatus(SpecStatus status) {
        this.status = status;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
