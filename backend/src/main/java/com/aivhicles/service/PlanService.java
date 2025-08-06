package com.aivhicles.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.aivhicles.model.Plan;
import com.aivhicles.model.PlanChangeLog;
import com.aivhicles.repository.PlanChangeLogRepository;
import com.aivhicles.repository.PlanRepository;

/**
 * Service for plan operations and auditing.
 */
@Service
public class PlanService {
    private final PlanRepository planRepository;
    private final PlanChangeLogRepository logRepository;

    public PlanService(PlanRepository planRepository, PlanChangeLogRepository logRepository) {
        this.planRepository = planRepository;
        this.logRepository = logRepository;
    }

    public List<Plan> findVisible() {
        return planRepository.findByVisibleTrue();
    }

    public List<Plan> findAll() {
        return planRepository.findAll();
    }

    public Plan create(Plan plan, String admin) {
        Plan saved = planRepository.save(plan);
        logChange(saved.getId(), admin, "CREATE");
        return saved;
    }

    public Plan update(Long id, Plan plan, String admin) {
        Plan existing = planRepository.findById(id).orElseThrow();
        existing.setName(plan.getName());
        existing.setPrice(plan.getPrice());
        existing.setBillingPeriod(plan.getBillingPeriod());
        existing.setFeatures(plan.getFeatures());
        existing.setCtaText(plan.getCtaText());
        existing.setVisible(plan.isVisible());
        Plan saved = planRepository.save(existing);
        logChange(id, admin, "UPDATE");
        return saved;
    }

    public void delete(Long id, String admin) {
        planRepository.deleteById(id);
        logChange(id, admin, "DELETE");
    }

    private void logChange(Long planId, String admin, String action) {
        PlanChangeLog log = new PlanChangeLog();
        log.setPlanId(planId);
        log.setAdmin(admin);
        log.setAction(action);
        log.setTimestamp(LocalDateTime.now());
        logRepository.save(log);
    }
}

