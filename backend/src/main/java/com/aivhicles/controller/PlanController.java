package com.aivhicles.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.aivhicles.model.Plan;
import com.aivhicles.service.PlanService;

import jakarta.validation.Valid;

/**
 * REST controller for managing pricing plans.
 */
@RestController
@RequestMapping("/api/plans")
public class PlanController {
    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping("/public")
    public List<Plan> publicPlans() {
        return planService.findVisible();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Plan> allPlans() {
        return planService.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Plan create(@Valid @RequestBody Plan plan, Authentication auth) {
        return planService.create(plan, auth.getName());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Plan update(@PathVariable Long id, @Valid @RequestBody Plan plan, Authentication auth) {
        return planService.update(id, plan, auth.getName());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id, Authentication auth) {
        planService.delete(id, auth.getName());
    }
}

