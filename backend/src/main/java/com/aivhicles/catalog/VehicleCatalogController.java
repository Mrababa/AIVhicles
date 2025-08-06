package com.aivhicles.catalog;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vehicles/catalog")
public class VehicleCatalogController {
    private final VehicleService service;

    public VehicleCatalogController(VehicleService service) {
        this.service = service;
    }

    @GetMapping
    public Map<String, Object> list(
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer yearFrom,
            @RequestParam(required = false) Integer yearTo,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) String transmission,
            @RequestParam(required = false) String bodyType,
            @RequestParam(required = false) String driveType,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "24") int limit,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "light") String category
    ) {
        // Category filtering - only allow 'light'
        if (!"light".equalsIgnoreCase(category)) {
            Map<String, Object> empty = new HashMap<>();
            empty.put("data", List.of());
            empty.put("total", 0);
            empty.put("page", page);
            empty.put("limit", limit);
            return empty;
        }

        VehicleSearchParams params = new VehicleSearchParams();
        params.setMake(make);
        params.setModel(model);
        params.setYearFrom(yearFrom);
        params.setYearTo(yearTo);
        params.setFuelType(fuelType);
        params.setTransmission(transmission);
        params.setBodyType(bodyType);
        params.setDriveType(driveType);
        params.setSort(sort);
        params.setPage(page);
        params.setLimit(limit);
        params.setSearch(search);

        List<Vehicle> data = service.search(params);
        long total = service.count(params);
        Map<String, Object> response = new HashMap<>();
        response.put("data", data);
        response.put("total", total);
        response.put("page", page);
        response.put("limit", limit);
        return response;
    }
}
