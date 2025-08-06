package com.aivhicles.catalog;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class VehicleService {
    private final List<Vehicle> vehicles = new ArrayList<>();

    public VehicleService() {
        vehicles.add(new Vehicle("veh-1", "Toyota", "Corolla", 2024, "Hybrid", "Automatic", "Sedan", "FWD", "https://cdn.site.com/images/corolla.jpg", 24000.0));
        vehicles.add(new Vehicle("veh-2", "Ford", "F-150", 2023, "Petrol", "Automatic", "Pickup", "RWD", "https://cdn.site.com/images/f150.jpg", 32000.0));
        vehicles.add(new Vehicle("veh-3", "Tesla", "Model 3", 2024, "Electric", "Automatic", "Sedan", "RWD", "https://cdn.site.com/images/model3.jpg", 39999.0));
    }

    public List<Vehicle> search(VehicleSearchParams params) {
        return vehicles.stream()
                .filter(v -> params.getMake() == null || v.getMake().equalsIgnoreCase(params.getMake()))
                .filter(v -> params.getModel() == null || v.getModel().toLowerCase(Locale.ROOT).contains(params.getModel().toLowerCase(Locale.ROOT)))
                .filter(v -> params.getFuelType() == null || v.getFuelType().equalsIgnoreCase(params.getFuelType()))
                .filter(v -> params.getTransmission() == null || v.getTransmission().equalsIgnoreCase(params.getTransmission()))
                .filter(v -> params.getBodyType() == null || v.getBodyType().equalsIgnoreCase(params.getBodyType()))
                .filter(v -> params.getDriveType() == null || v.getDriveType().equalsIgnoreCase(params.getDriveType()))
                .filter(v -> params.getYearFrom() == null || v.getYear() >= params.getYearFrom())
                .filter(v -> params.getYearTo() == null || v.getYear() <= params.getYearTo())
                .filter(v -> params.getSearch() == null ||
                        (v.getMake() + " " + v.getModel() + " " + v.getFuelType() + " " + v.getBodyType())
                            .toLowerCase(Locale.ROOT)
                            .contains(params.getSearch().toLowerCase(Locale.ROOT)))
                .sorted(getComparator(params.getSort()))
                .skip((long) (params.getPage() - 1) * params.getLimit())
                .limit(params.getLimit())
                .collect(Collectors.toList());
    }

    public long count(VehicleSearchParams params) {
        return vehicles.stream()
                .filter(v -> params.getMake() == null || v.getMake().equalsIgnoreCase(params.getMake()))
                .filter(v -> params.getModel() == null || v.getModel().toLowerCase(Locale.ROOT).contains(params.getModel().toLowerCase(Locale.ROOT)))
                .filter(v -> params.getFuelType() == null || v.getFuelType().equalsIgnoreCase(params.getFuelType()))
                .filter(v -> params.getTransmission() == null || v.getTransmission().equalsIgnoreCase(params.getTransmission()))
                .filter(v -> params.getBodyType() == null || v.getBodyType().equalsIgnoreCase(params.getBodyType()))
                .filter(v -> params.getDriveType() == null || v.getDriveType().equalsIgnoreCase(params.getDriveType()))
                .filter(v -> params.getYearFrom() == null || v.getYear() >= params.getYearFrom())
                .filter(v -> params.getYearTo() == null || v.getYear() <= params.getYearTo())
                .filter(v -> params.getSearch() == null ||
                        (v.getMake() + " " + v.getModel() + " " + v.getFuelType() + " " + v.getBodyType())
                            .toLowerCase(Locale.ROOT)
                            .contains(params.getSearch().toLowerCase(Locale.ROOT)))
                .count();
    }

    private Comparator<Vehicle> getComparator(String sort) {
        if (sort == null) return Comparator.comparing(Vehicle::getMake);
        return switch (sort) {
            case "year_desc" -> Comparator.comparing(Vehicle::getYear).reversed();
            case "year_asc" -> Comparator.comparing(Vehicle::getYear);
            case "price_asc" -> Comparator.comparing(v -> v.getPrice() == null ? 0 : v.getPrice());
            case "price_desc" -> Comparator.comparing((Vehicle v) -> v.getPrice() == null ? 0 : v.getPrice()).reversed();
            case "make_asc" -> Comparator.comparing(Vehicle::getMake);
            default -> Comparator.comparing(Vehicle::getMake);
        };
    }
}
