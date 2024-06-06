package com.SubtleSolve.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
// import org.springframework.format.annotation.DateTimeFormat;

// import java.time.LocalDateTime;

@Document(collection = "games")
public class DailyGame {
    @Id
    private String dailyGameId;

    public String getDailyGameId() {
        return dailyGameId;
    }

    public void setDailyGameId(String dailyGameId) {
        this.dailyGameId = dailyGameId;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestion(String questionId) {
        this.questionId = questionId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Float getAvgScore() {
        return avgScore;
    }

    public void setAvgScore(Float avgScore) {
        this.avgScore = avgScore;
    }

    private String questionId;
    // @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private String date;
    private Float avgScore;
}
