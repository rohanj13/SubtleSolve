package com.SubtleSolve.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SubtleSolve.service.PuzzleService;

@RestController
@CrossOrigin
public class GameController {
    @Autowired
    private PuzzleService puzzleService;

    // Save method is predefine method in Mongo Repository
    // with this method we will save user in our database
    // @PostMapping("/addGame")
    // public Games addGame(@RequestBody Games game) {
    // return gameRepo.save(game);
    // }

    @GetMapping("/api/dailypuzzle")
    public ResponseEntity<String> DailyPuzzle(@RequestParam String today) {
        // String today = payload.get("today");
        return ResponseEntity.ok().body(puzzleService.getDailyGame(today));
    }
}
