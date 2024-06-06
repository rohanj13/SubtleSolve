package com.SubtleSolve.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.SubtleSolve.model.User;

public interface UserRepo extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
