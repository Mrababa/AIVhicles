package com.aivhicles.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aivhicles.model.Vehicle;

/**
 * Repository for {@link Vehicle} entities.
 */
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
