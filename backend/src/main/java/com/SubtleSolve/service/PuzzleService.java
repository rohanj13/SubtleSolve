package com.SubtleSolve.service;

import org.json.JSONObject;

import com.SubtleSolve.model.DailyGame;

public interface PuzzleService {
    // create the game every day at midnight and update to repository. No need for
    // controller api for this
    DailyGame createDailyGame(String today);

    // use repo to get game based on the date today. Need controller to call this
    // via API.
    String getDailyGame(String today);
}
