package com.SubtleSolve.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.SubtleSolve.model.DailyGame;

public interface GameRepo extends MongoRepository<DailyGame, String> {
    DailyGame findFirstByOrderByDateDesc();

    Optional<DailyGame> findByDate(String date);
}