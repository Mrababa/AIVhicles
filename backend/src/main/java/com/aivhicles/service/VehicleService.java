package com.aivhicles.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aivhicles.model.Vehicle;
import com.aivhicles.repository.VehicleRepository;

/**
 * Service for vehicle operations.
 */
@Service
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    public Vehicle save(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }
}
