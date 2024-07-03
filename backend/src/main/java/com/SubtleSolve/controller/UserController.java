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
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/creategameplay")
    public ResponseEntity<String> createGameplay(@RequestBody Map<String, String> payload) {
        String gameID = payload.get("gameID");
        String firstGuess = payload.get("firstGuess");
        System.out.println(firstGuess);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken) {
            Jwt jwt = ((JwtAuthenticationToken) authentication).getToken();
            String username = jwt.getClaimAsString("preferred_username");

            if (username == null || username.isEmpty()) {
                username = jwt.getClaimAsString("sub");
            }

            String gp = userService.createGameplay(username, gameID, firstGuess);
            return ResponseEntity.ok().body(gp);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }

    @PostMapping("/updategameplay")
    public ResponseEntity<String> updateGameplay(@RequestBody Map<String, String> payload) {
        String gameId = payload.get("gameID");
        String guess = payload.get("guess");
        System.out.println("in usercontroller: " + gameId);
        System.out.println("in usercontroller: " + guess);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken) {
            Jwt jwt = ((JwtAuthenticationToken) authentication).getToken();
            String username = jwt.getClaimAsString("preferred_username");
            System.out.println("in usercontroller: " + username);
            String progress = userService.updateGameplay(username, gameId, guess);
            return ResponseEntity.ok().body(progress);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }

    @PostMapping("/updatescore")
    public ResponseEntity<Integer> updateScore(@RequestBody Map<String, Object> payload) {
        String yesterday = (String) payload.get("yesterday");
        String today = (String) payload.get("today");
        String gameId = (String) payload.get("gameID");
        int score = (Integer) payload.get("score");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken) {
            Jwt jwt = ((JwtAuthenticationToken) authentication).getToken();
            String username = jwt.getClaimAsString("preferred_username");
            // System.out.println("in usercontroller: " + username);
            int currScore = userService.updateScore(username, gameId, score, yesterday, today);
            return ResponseEntity.ok().body(currScore);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(0);
        }

    }

    @GetMapping("/history")
    public ResponseEntity<List<String>> getHistory(@RequestParam String gameId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken) {
            Jwt jwt = ((JwtAuthenticationToken) authentication).getToken();
            String username = jwt.getClaimAsString("preferred_username");
            // System.out.println("in usercontroller: " + username);
            List<String> history = new ArrayList<String>();
            history = userService.getHistory(username, gameId);
            return ResponseEntity.ok().body(history);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ArrayList<String>());
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<String> getStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken) {
            Jwt jwt = ((JwtAuthenticationToken) authentication).getToken();
            String username = jwt.getClaimAsString("preferred_username");
            // System.out.println("in usercontroller: " + username);
            String stats = userService.getStats(username);
            return ResponseEntity.ok().body(stats);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Cannot retreive stats");
        }

    }

    // @PostMapping("/create")
    // public ResponseEntity<String> createUser() {
    // Authentication authentication =
    // SecurityContextHolder.getContext().getAuthentication();
    // Jwt jwt = (Jwt) authentication.getPrincipal();
    // String username = jwt.getClaim("preferred_username");
    // String created = userService.createUser(username);
    // return ResponseEntity.ok().body(created);
    // }
}
