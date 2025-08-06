package com.aivhicles.damage;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service performing placeholder AI analysis of vehicle damage.
 */
@Service
public class DamageEstimationService {

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    public DamageReport analyze(List<MultipartFile> images) {
        if (images == null || images.isEmpty() || images.size() > 4) {
            throw new IllegalArgumentException("Upload 1 to 4 images");
        }
        for (MultipartFile image : images) {
            if (image.getSize() > MAX_FILE_SIZE) {
                throw new IllegalArgumentException("File too large: " + image.getOriginalFilename());
            }
        }

        // Placeholder logic simulating AI analysis
        List<DamageItem> damages = List.of(
                new DamageItem("Front bumper", 0.92, 500.0),
                new DamageItem("Headlight", 0.85, 250.0));
        double partsCost = damages.stream().mapToDouble(DamageItem::cost).sum();
        double laborCost = partsCost * 0.4;
        double totalCost = partsCost + laborCost;
        return new DamageReport("SampleMake", "SampleModel", 2020, damages, partsCost, laborCost, totalCost);
    }
}
