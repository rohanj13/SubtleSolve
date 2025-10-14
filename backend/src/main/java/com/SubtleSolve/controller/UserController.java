package com.SubtleSolve.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.SubtleSolve.service.UserServiceImpl;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    /**
     * Helper method to extract the username from the JWT token.
     * Tries in order: nickname -> email -> sub (Auth0 user ID)
     */
    private String getUsernameFromJwt() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof JwtAuthenticationToken)) {
            return null;
        }
        Jwt jwt = ((JwtAuthenticationToken) authentication).getToken();

        String username = jwt.getClaimAsString("nickname");
        if (username == null || username.isEmpty()) {
            username = jwt.getClaimAsString("email");
        }
        if (username == null || username.isEmpty()) {
            username = jwt.getClaimAsString("sub");
        }
        return username;
    }

    @PostMapping("/creategameplay")
    public ResponseEntity<String> createGameplay(@RequestBody Map<String, String> payload) {
        String username = getUsernameFromJwt();
        if (username == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");

        String gameID = payload.get("gameID");
        String firstGuess = payload.get("firstGuess");

        String gp = userService.createGameplay(username, gameID, firstGuess);
        return ResponseEntity.ok(gp);
    }

    @PostMapping("/updategameplay")
    public ResponseEntity<String> updateGameplay(@RequestBody Map<String, String> payload) {
        String username = getUsernameFromJwt();
        if (username == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");

        String gameId = payload.get("gameID");
        String guess = payload.get("guess");

        String progress = userService.updateGameplay(username, gameId, guess);
        return ResponseEntity.ok(progress);
    }

    @PostMapping("/updatescore")
    public ResponseEntity<Integer> updateScore(@RequestBody Map<String, Object> payload) {
        String username = getUsernameFromJwt();
        if (username == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(0);

        String yesterday = (String) payload.get("yesterday");
        String today = (String) payload.get("today");
        String gameId = (String) payload.get("gameID");
        int score = (Integer) payload.get("score");

        int currScore = userService.updateScore(username, gameId, score, yesterday, today);
        return ResponseEntity.ok(currScore);
    }

    @GetMapping("/history")
    public ResponseEntity<List<String>> getHistory(@RequestParam String gameId) {
        String username = getUsernameFromJwt();
        if (username == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ArrayList<>());

        List<String> history = userService.getHistory(username, gameId);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/stats")
    public ResponseEntity<String> getStats() {
        String username = getUsernameFromJwt();
        if (username == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Cannot retrieve stats");

        String stats = userService.getStats(username);
        return ResponseEntity.ok(stats);
    }
}