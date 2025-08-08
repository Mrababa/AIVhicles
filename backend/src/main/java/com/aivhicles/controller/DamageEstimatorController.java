package com.aivhicles.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aivhicles.damage.DamageReport;
import com.aivhicles.damage.DamageEstimationService;

/**
 * REST controller exposing the car damage estimation endpoint.
 */
@RestController
@RequestMapping("/api/damage-estimator")
public class DamageEstimatorController {
    private final DamageEstimationService service;

    public DamageEstimatorController(DamageEstimationService service) {
        this.service = service;
    }

    @PostMapping(value = "/analyze", consumes = "multipart/form-data")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> analyze(@RequestParam("images") List<MultipartFile> images) {
        try {
            DamageReport report = service.analyze(images);
            return ResponseEntity.ok(report);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
