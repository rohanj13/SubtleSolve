package com.SubtleSolve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SubtleSolve.model.DailyGame;
import com.SubtleSolve.model.Question;
import com.SubtleSolve.repository.GameRepo;
import com.SubtleSolve.repository.QuestionRepo;

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
        // run create daily game for testing everytime this is called, then call this in
        // the controller to get the document and question id
        DailyGame dailygame;
        Optional<DailyGame> optionalDailygame = gameRepo.findByDate(today);
        // LocalDate ld = LocalDate.now(ZoneId.of("Australia/Sydney"));
        // System.out.println(ld);
        // System.out.println(optionalDailygame.get().getDate());
        // System.out.println((dailygame.getDate().plusHours(11).toLocalDate()));
        if (!optionalDailygame.isPresent()) {
            dailygame = createDailyGame(today);

        } else {
            dailygame = optionalDailygame.get();
        }

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
