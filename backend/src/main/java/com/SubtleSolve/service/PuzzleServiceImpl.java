package com.SubtleSolve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SubtleSolve.model.DailyGame;
import com.SubtleSolve.model.Question;
import com.SubtleSolve.repository.GameRepo;
import com.SubtleSolve.repository.QuestionRepo;
import com.mongodb.DuplicateKeyException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;
import org.json.JSONObject;

@Service
@Transactional
public class PuzzleServiceImpl implements PuzzleService {

    @Autowired
    private GameRepo gameRepo;
    @Autowired
    private QuestionRepo questionRepo;

    @Override
    public DailyGame createDailyGame(String today) {
        DailyGame dg = new DailyGame();
        boolean gotQuestion = false;
        Question question = null;
        while (!gotQuestion) {
            question = questionRepo.random().getMappedResults().stream().findFirst().orElse(null);

            if (!question.getPlayed()) {
                dg.setQuestion(question.getQuestionId());
                gotQuestion = true;
            }
        }

        // System.out.println(now);
        dg.setDate(today);
        gameRepo.save(dg);
        question.setPlayed(true);
        questionRepo.save(question);
        return dg;
    }

    @Override
    public String getDailyGame(String today) {
        DailyGame dailygame;
        Optional<DailyGame> optionalDailygame = gameRepo.findByDate(today);

        if (!optionalDailygame.isPresent()) {
            try {
                // Attempt to create the daily game
                dailygame = createDailyGame(today);
            } catch (DuplicateKeyException e) {
                // If a duplicate key exception occurs, fetch the existing puzzle
                dailygame = gameRepo.findByDate(today)
                        .orElseThrow(() -> new RuntimeException("Puzzle not found after duplicate error"));
            }
        } else {
            dailygame = optionalDailygame.get();
        }

        // Retrieve the question and build the response
        Optional<Question> gameQuestion = questionRepo.findById(dailygame.getQuestionId());
        JSONObject jsonResponse = new JSONObject();
        if (gameQuestion.isPresent()) {
            jsonResponse.put("dailyGameId", dailygame.getDailyGameId().toString());
            jsonResponse.put("category", gameQuestion.get().getCategory());
            jsonResponse.put("answer", gameQuestion.get().getAnswer());
            jsonResponse.put("clues", gameQuestion.get().getClues());
        }

        return jsonResponse.toString();
    }

}
