package com.SubtleSolve.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

        public static final String ADMIN = "admin";
        public static final String USER = "player";
        private final JwtConverter jwtConverter = null;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .cors(Customizer.withDefaults())
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(
                                                (authz) -> authz.requestMatchers(HttpMethod.GET, "/api/dailypuzzle")
                                                                .permitAll()
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/api/history/**")
                                                                .permitAll()
                                                                .requestMatchers(HttpMethod.POST, "/api/user/**")
                                                                .authenticated()
                                                                .requestMatchers(HttpMethod.GET, "/api/user/stats")
                                                                .authenticated()
                                                                // .requestMatchers(HttpMethod.OPTIONS,
                                                                // "/**").permitAll()
                                                                .anyRequest().permitAll());

                http.sessionManagement(sess -> sess.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS));
                http.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtConverter)));

                return http.build();
        }
}