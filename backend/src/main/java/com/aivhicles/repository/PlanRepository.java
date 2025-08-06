package com.aivhicles.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aivhicles.model.Plan;

/**
 * Repository for {@link Plan} entities.
 */
public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByVisibleTrue();
}

