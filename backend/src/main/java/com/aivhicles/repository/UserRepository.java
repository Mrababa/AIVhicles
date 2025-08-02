package com.aivhicles.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aivhicles.model.User;

/**
 * Repository for {@link User}.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
