package com.SubtleSolve.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.SubtleSolve.model.Question;
import com.SubtleSolve.repository.QuestionRepo;

@RestController
public class QuestionController {
    @Autowired
    private QuestionRepo questionRepo;

    // Save method is predefine method in Mongo Repository
    // with this method we will save question in our database
    @PostMapping("/addQuestion")
    public Question addQuestion(@RequestBody Question question) {
        return questionRepo.save(question);
    }

    // findAll method is predefine method in Mongo Repository
    // with this method we will all user that is save in our database
    @GetMapping("/getAllQuestions")
    public List<Question> getAllQuestions() {
        return questionRepo.findAll();
    }
}
