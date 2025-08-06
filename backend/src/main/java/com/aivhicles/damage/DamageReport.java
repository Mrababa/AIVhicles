package com.aivhicles.damage;

import java.util.List;

/**
 * Full report returned by the damage estimation service.
 */
public record DamageReport(
        String make,
        String model,
        int year,
        List<DamageItem> damages,
        double partsCost,
        double laborCost,
        double totalCost) {
}
