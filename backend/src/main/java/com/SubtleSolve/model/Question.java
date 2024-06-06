package com.SubtleSolve.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "questions")
public class Question {
    @Id
    private String questionId;
    private String answer;
    private String category;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public void setPlayed(Boolean played) {
        this.played = played;
    }

    public void setClues(String[] clues) {
        this.clues = clues;
    }

    public String getAnswer() {
        return answer;
    }

    public Boolean getPlayed() {
        return played;
    }

    public String[] getClues() {
        return clues;
    }

    private Boolean played;
    private String[] clues;

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

}
