package com.SubtleSolve.repository;

import java.util.Optional;

import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.SubtleSolve.model.Question;

public interface QuestionRepo extends MongoRepository<Question, String> {

    Optional<Question> findById(String id);

    @Aggregation(pipeline = { "{$sample:{size:1}}" })
    AggregationResults<Question> random();
}