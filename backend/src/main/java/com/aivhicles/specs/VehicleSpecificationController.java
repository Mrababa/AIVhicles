package com.aivhicles.specs;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller providing CRUD operations for vehicle specifications.
 */
@RestController
@RequestMapping("/api/specs")
@PreAuthorize("hasAnyRole('CATALOG_MANAGER','ADMIN')")
public class VehicleSpecificationController {

    private final VehicleSpecificationRepository repository;

    public VehicleSpecificationController(VehicleSpecificationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<VehicleSpecification> all() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleSpecification> get(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public VehicleSpecification create(@RequestBody VehicleSpecification spec) {
        spec.setId(null);
        return repository.save(spec);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehicleSpecification> update(@PathVariable Long id, @RequestBody VehicleSpecification spec) {
        return repository.findById(id)
                .map(existing -> {
                    spec.setId(id);
                    return ResponseEntity.ok(repository.save(spec));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
