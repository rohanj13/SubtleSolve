package com.SubtleSolve.service;

import java.util.ArrayList;
import java.util.List;

public interface UserService {
    // void createUser(String username);

    String createGameplay(String username, String gameID, String firstGuess);

    String updateGameplay(String username, String gameId, String guess);

    int updateScore(String username, String gameId, int score, String yesterday, String today);

    List<String> getHistory(String username, String gameId);

    String getStats(String username);
}
