-- Database schema for AIVhicles
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE vehicles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(255),
    model VARCHAR(255),
    year INT,
    fuel_type VARCHAR(50),
    transmission VARCHAR(50),
    body_type VARCHAR(50),
    drive_type VARCHAR(50),
    image_url VARCHAR(512),
    price DECIMAL(10, 2)
);

CREATE TABLE damage_reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id BIGINT,
    make VARCHAR(255),
    model VARCHAR(255),
    year INT,
    parts_cost DECIMAL(10, 2),
    labor_cost DECIMAL(10, 2),
    total_cost DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

CREATE TABLE damage_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    report_id BIGINT NOT NULL,
    part VARCHAR(255),
    confidence DOUBLE,
    cost DECIMAL(10, 2),
    FOREIGN KEY (report_id) REFERENCES damage_reports(id) ON DELETE CASCADE
);
