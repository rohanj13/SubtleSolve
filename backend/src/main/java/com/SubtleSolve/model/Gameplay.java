package com.SubtleSolve.model;

import java.util.ArrayList;
import java.util.List;

public class Gameplay {
    private String dailyGameID;
    private ArrayList<String> guesses;
    private int score;

    public Gameplay(String dailyGameID) {
        this.dailyGameID = dailyGameID;
        this.guesses = new ArrayList<>();
        // this.guesses.add(firstGuess);
        this.score = 0;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getDailyGameID() {
        return this.dailyGameID;
    }

    public void setDailyGameID(String dailyGameID) {
        this.dailyGameID = dailyGameID;
    }

    public List<String> getGuesses() {
        return guesses;
    }

    public void addGuess(String guess) {
        this.guesses.add(guess);
    }

    public void setGuesses(ArrayList<String> guesses) {
        this.guesses = guesses;
    }

}
