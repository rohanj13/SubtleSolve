package com.SubtleSolve.service;

import com.SubtleSolve.model.Gameplay;
import com.SubtleSolve.model.User;
import com.SubtleSolve.repository.UserRepo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    public User createUser(String username) {
        // Implement your logic to create a new user
        User user = new User(username);
        userRepo.save(user);
        return user;
    }

    public Optional<User> checkUserExists(String username) {
        Optional<User> optionalUser = userRepo.findByUsername(username);

        return optionalUser;
    }

    @Override
    public String createGameplay(String username, String gameID, String firstGuess) {
        // if user does not exist already
        Optional<User> optionalUser = checkUserExists(username);
        User tempUser = null;
        if (!optionalUser.isPresent()) {
            // create user
            tempUser = createUser(username);
        } else {
            tempUser = optionalUser.get();
        }
        // create gameplay
        System.out.println(firstGuess);
        Gameplay gameplay = tempUser.addGamePlay(gameID);
        tempUser.getGamePlay(gameID).addGuess(firstGuess);
        userRepo.save(tempUser);
        return "Gameplay"; // Dummy value, replace with actual score calculation
    }

    @Override
    public String updateGameplay(String username, String gameId, String guess) {
        // Implement your logic to update gameplay
        Optional<User> optionalUser = checkUserExists(username);
        optionalUser.get().getGamePlay(gameId).addGuess(guess);
        userRepo.save(optionalUser.get());
        return "Updated gameplay progress"; // Dummy value
    }

    @Override
    public int updateScore(String username, String gameId, int score, String yesterday, String today) {
        // Implement your logic to update the user's score
        Optional<User> optionalUser = checkUserExists(username);
        optionalUser.get().getGamePlay(gameId).setScore(score);
        optionalUser.get().incrementStreak(yesterday, today);
        optionalUser.get().updateDistribution(score);
        optionalUser.get().updateWinPercent(score);
        userRepo.save(optionalUser.get());
        return score;
    }

    @Override
    public List<String> getHistory(String username, String gameId) {
        // Implement your logic to retrieve gameplay history
        List<String> alreadyGuessed = new ArrayList<String>();
        Optional<User> optionalUser = checkUserExists(username);
        if (!optionalUser.isPresent()) {
            return alreadyGuessed;
        } else {
            Gameplay g = optionalUser.get().getGamePlay(gameId);
            if (g == null) {
                return alreadyGuessed;
            } else {
                alreadyGuessed = g.getGuesses();
                return alreadyGuessed;
            }
        }

    }

    @Override
    public String getStats(String username) {
        // Implement your logic to retrieve user statistics
        // need to return guess list, score, distribution, current streak, best streak
        Optional<User> optionalUser = checkUserExists(username);
        JSONObject jsonResponse = new JSONObject();
        User user = null;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();

            jsonResponse.put("played", user.getPlayed());
            // jsonResponse.put("answer", gameQuestion.get().getCategory());
            jsonResponse.put("win_percent", user.getWinPercentage());
            jsonResponse.put("currentStreak", user.getCurrentStreak());
            jsonResponse.put("bestStreak", user.getBestStreak());
            jsonResponse.put("scoreDistribution", user.getDistribution());
        } else {
            HashMap<Integer, Integer> scoreDistribution = new HashMap<Integer, Integer>();
            scoreDistribution.put(0, 0);
            scoreDistribution.put(1, 0);
            scoreDistribution.put(2, 0);
            scoreDistribution.put(3, 0);
            scoreDistribution.put(4, 0);
            scoreDistribution.put(5, 0);
            jsonResponse.put("played", 0);
            jsonResponse.put("win_percent", 0);
            jsonResponse.put("currentStreak", 0);
            jsonResponse.put("bestStreak", 0);
            jsonResponse.put("scoreDistribution", scoreDistribution);

        }
        return jsonResponse.toString(); // return json object with all stats
    }
}
