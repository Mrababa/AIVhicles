package com.aivhicles.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aivhicles.model.PlanChangeLog;

/**
 * Repository for {@link PlanChangeLog} entities.
 */
public interface PlanChangeLogRepository extends JpaRepository<PlanChangeLog, Long> {
}

