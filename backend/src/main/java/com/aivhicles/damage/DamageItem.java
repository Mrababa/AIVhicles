package com.aivhicles.damage;

/**
 * Represents a single damaged part detected in an image.
 */
public record DamageItem(String part, double confidence, double cost) {}
