package com.SubtleSolve.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "users")
public class User {
    @Id
    private String userId;
    private ArrayList<Gameplay> allGames;
    private String username;
    private int currentStreak;
    private int bestStreak;
    private HashMap<Integer, Integer> scoreDistribution;
    private int winPercent;
    private int played;
    private String yesterday;
    private int totalWins;

    public User(String username) {
        this.allGames = new ArrayList<Gameplay>();
        this.username = username;
        this.currentStreak = 0;
        this.bestStreak = 0;
        this.winPercent = 0;
        this.played = 0;
        this.totalWins = 0;
        this.yesterday = null;
        this.scoreDistribution = new HashMap<Integer, Integer>();
        this.scoreDistribution.put(0, 0);
        this.scoreDistribution.put(1, 0);
        this.scoreDistribution.put(2, 0);
        this.scoreDistribution.put(3, 0);
        this.scoreDistribution.put(4, 0);
        this.scoreDistribution.put(5, 0);
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String name) {
        this.username = name;
    }

    public Gameplay getGamePlay(String gameID) {
        System.out.println("in get gameplay: " + gameID);
        for (Gameplay g : allGames) {
            if (g.getDailyGameID().equals(gameID)) {
                return g;
            }
        }
        return null;
    }

    public Gameplay addGamePlay(String gameId) {
        Gameplay g = new Gameplay(gameId);
        this.allGames.add(g);
        return g;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }

    public int getBestStreak() {
        return bestStreak;
    }

    public int getPlayed() {
        return this.played;
    }

    public int getWinPercentage() {
        return this.winPercent;
    }

    public void updateWinPercent(int score) {
        if (score != 0) {
            totalWins += 1;
        }
        float winPercentage = ((float) totalWins / (float) played) * 100;
        this.winPercent = (int) winPercentage;
    }

    public void setCurrentStreak(int streak) {
        this.currentStreak = streak;
    }

    public void incrementStreak(String yesterday, String today) {
        this.played += 1;
        System.out.println(yesterday);
        if (this.yesterday == null || this.yesterday.equals(yesterday)) {
            this.currentStreak += 1;
        } else if (this.yesterday != yesterday) {
            this.currentStreak = 1;
        }
        this.yesterday = today;
        if (this.currentStreak >= this.bestStreak) {
            this.bestStreak = this.currentStreak;
        }
    }

    public void updateDistribution(int score) {
        this.scoreDistribution.put(score, scoreDistribution.getOrDefault(score, 0) + 1);
    }

    public Map<Integer, Integer> getDistribution() {
        return this.scoreDistribution;
    }
}
