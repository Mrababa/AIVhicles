package com.aivhicles.catalog;

public class VehicleSearchParams {
    private String make;
    private String model;
    private Integer yearFrom;
    private Integer yearTo;
    private String fuelType;
    private String transmission;
    private String bodyType;
    private String driveType;
    private String sort;
    private int page = 1;
    private int limit = 24;
    private String search;

    // getters and setters
    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getYearFrom() { return yearFrom; }
    public void setYearFrom(Integer yearFrom) { this.yearFrom = yearFrom; }

    public Integer getYearTo() { return yearTo; }
    public void setYearTo(Integer yearTo) { this.yearTo = yearTo; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public String getTransmission() { return transmission; }
    public void setTransmission(String transmission) { this.transmission = transmission; }

    public String getBodyType() { return bodyType; }
    public void setBodyType(String bodyType) { this.bodyType = bodyType; }

    public String getDriveType() { return driveType; }
    public void setDriveType(String driveType) { this.driveType = driveType; }

    public String getSort() { return sort; }
    public void setSort(String sort) { this.sort = sort; }

    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }

    public int getLimit() { return limit; }
    public void setLimit(int limit) { this.limit = limit; }

    public String getSearch() { return search; }
    public void setSearch(String search) { this.search = search; }
}
